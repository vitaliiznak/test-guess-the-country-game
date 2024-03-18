export const makeQuestionType: () => "name" | "capital" | "name" = () => {
    if (Math.random() < 0.5) {
      return "name";
    } else if (Math.random() < 0.75) {
      return "capital";
    } else {
      return "name";
    }
  };