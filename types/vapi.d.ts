enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  ADD_MESSAGE = "add-message",
}

enum MessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

type Conversation = {
  role: MessageRoleEnum;
  content: string;
};

interface TranscriptMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: "partial" | "final";
  transcript: string;
}

type VapiMessage = {
  conversation?: Conversation[];
  transcript?: string;
};

type VapiError = {
  action: "error" | "success";
  callClientId: string;
  error: unknown;
  errorMsg: string;
};
