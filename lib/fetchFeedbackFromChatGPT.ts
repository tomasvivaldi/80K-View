const fetchFeedbackFromChatGPT = () =>
  fetch("/api/feedback", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchFeedbackFromChatGPT;