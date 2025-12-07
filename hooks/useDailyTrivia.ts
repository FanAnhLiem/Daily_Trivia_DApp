"use client";

import { useState } from "react";
import {
  useCurrentAccount,
  useIotaClient,
  useSignAndExecuteTransaction,
} from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import {
  TRIVIA_PACKAGE_ID,
  TRIVIA_MODULE_NAME,
  TRIVIA_METHODS,
} from "@/lib/config";

export function useDailyTrivia() {
  const account = useCurrentAccount();
  const iotaClient = useIotaClient();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null
  );

  const answerTrivia = async (
    choice: number
  ): Promise<"correct" | "wrong" | null> => {
    if (!account) {
      setError(new Error("Chưa kết nối ví"));
      return null;
    }

    setIsLoading(true);
    setError(null);
    setLastResult(null);

    try {
      const tx = new Transaction();

      // Gọi entry fun daily_trivia::daily_trivia::answer_trivia(choice: u8, ctx)
      tx.moveCall({
        target: `${TRIVIA_PACKAGE_ID}::${TRIVIA_MODULE_NAME}::${TRIVIA_METHODS.ANSWER}`,
        arguments: [tx.pure.u8(choice as number)],
      });

      const res = await signAndExecute({
        transaction: tx as never,
      });

      const digest = res?.digest;
      if (!digest) {
        throw new Error("Không lấy được transaction digest");
      }

      setTxHash(digest);

      // Đợi tx confirm + lấy effects
      const effectsResult = await iotaClient.waitForTransaction({
        digest,
        options: { showEffects: true },
      });

      const created = effectsResult.effects?.created ?? [];

      const createdIds: string[] = created
        .map((c: any) => c.reference?.objectId as string | undefined)
        .filter((id: string | undefined): id is string => !!id);

      let hasFlag = false;

      // Kiểm tra xem có object type ::Flag được tạo không
      for (const id of createdIds) {
        const obj = await iotaClient.getObject({
          id,
          options: { showType: true },
        });
        const type = obj.data?.type;
        if (typeof type === "string" && type.includes("::Flag")) {
          hasFlag = true;
          break;
        }
      }

      const result: "correct" | "wrong" = hasFlag ? "correct" : "wrong";
      setLastResult(result);
      setIsLoading(false);
      return result;
    } catch (e: any) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      setIsLoading(false);
      return null;
    }
  };

  return { account, isLoading, txHash, error, lastResult, answerTrivia };
}
