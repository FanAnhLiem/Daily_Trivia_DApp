module daily_trivia::daily_trivia {
    use iota::object;
    use iota::tx_context;
    use iota::transfer;

    /// Cờ thưởng nếu trả lời đúng
    public struct Flag has key, store {
        id: object::UID,
        owner: address,
    }

    /// Lưu lại kết quả trả lời
    public struct AnswerRecord has key, store {
        id: object::UID,
        player: address,
        choice: u8,
        correct: bool,
    }

    /// Người chơi trả lời: 0..3
    /// choice: 0 = A, 1 = B, 2 = C, 3 = D
    public entry fun answer_trivia(choice: u8, ctx: &mut tx_context::TxContext) {
        let sender = tx_context::sender(ctx);

        // Giới hạn input 0..3
        let safe_choice = if (choice > 3) { 0 } else { choice };

        // Đáp án đúng (hardcode tạm: A = 0)
        let correct_option: u8 = 0;
        let is_correct = safe_choice == correct_option;

        // Lưu record
        let record = AnswerRecord {
            id: object::new(ctx),
            player: sender,
            choice: safe_choice,
            correct: is_correct,
        };
        transfer::public_transfer(record, sender);

        // Nếu đúng thì mint Flag
        if (is_correct) {
            let flag = Flag {
                id: object::new(ctx),
                owner: sender,
            };
            transfer::public_transfer(flag, sender);
        };
    }
}
