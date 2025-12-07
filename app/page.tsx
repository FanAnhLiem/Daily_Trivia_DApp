"use client";

import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
} from "@radix-ui/themes";
import { ConnectButton } from "@iota/dapp-kit";
import { useDailyTrivia } from "@/hooks/useDailyTrivia";
import { useState } from "react";

const options = [
  "Thủ đô của Việt Nam là gì?",
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Huế",
];

export default function TriviaPage() {
  const { account, isLoading, txHash, error, lastResult, answerTrivia } =
    useDailyTrivia();
  const [selected, setSelected] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (selected === null) return;
    await answerTrivia(selected);
  };

  return (
    <main>
      <Container
        style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 0" }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Heading size="6">🧠 Daily Trivia DApp</Heading>
          <ConnectButton />
        </header>

        {!account && (
          <Text>Hãy kết nối ví IOTA để tham gia trả lời.</Text>
        )}

        {account && (
          <>
            <Text
              style={{
                marginBottom: "1rem",
                display: "block",
                fontFamily: "monospace",
              }}
            >
              Ví: {account.address}
            </Text>

            <Heading size="4" style={{ marginBottom: "1rem" }}>
              {options[0]}
            </Heading>

            <Flex direction="column" gap="2">
              {options.slice(1).map((opt, idx) => (
                <Button
                  key={idx}
                  variant={selected === idx ? "solid" : "outline"}
                  onClick={() => setSelected(idx)}
                  disabled={isLoading}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </Button>
              ))}
            </Flex>

            <Button
              style={{ marginTop: "1.5rem" }}
              onClick={handleSubmit}
              disabled={selected === null || isLoading}
            >
              {isLoading ? "Đang gửi..." : "Gửi đáp án"}
            </Button>

            {lastResult === "correct" && (
              <Text style={{ color: "var(--green-11)", marginTop: "1rem" }}>
                🎉 Chính xác! Bạn đã nhận được 1 Flag.
              </Text>
            )}
            {lastResult === "wrong" && (
              <Text style={{ color: "var(--red-11)", marginTop: "1rem" }}>
                😢 Chưa đúng rồi, thử lại câu tiếp theo nhé!
              </Text>
            )}

            {txHash && (
              <Text
                size="1"
                style={{
                  display: "block",
                  marginTop: "1rem",
                  fontFamily: "monospace",
                }}
              >
                Tx Hash: {txHash}
              </Text>
            )}

            {error && (
              <Text style={{ color: "var(--red-11)", marginTop: "1rem" }}>
                Error: {error.message}
              </Text>
            )}
          </>
        )}
      </Container>
    </main>
  );
}
