const API_KEY = 'VER8bCi7Z2p4eJ8mVDI96ZlqmhZDZV3EIQF7gIeV';

export const getQuestions = async () => {
  try {
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&difficulty=Medium&limit=15`
    );
    const data = await response.json();

    const formattedQuestions = data.map((question) => {
      const options = Object.values(question.answers).filter(Boolean);
      return {
        question: question.question,
        options: options,
        correct_answer: question.correct_answers[0]?.answer,
      };
    });

    return formattedQuestions;
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};
