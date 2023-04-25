type community = {
  username: string
  score: number
  notes: string
  action_plan: string
  id: number
  created_at: string
}

type Category = {
  username: string;
  score: number;
  notes: string;
  action_plan: string;
  id: number;
  created_at: string;
  documentNode: DocumentNode;
};

type CategoryQueries = {
  [key: string]: Category;
};

type DocumentNode ={
  username: string
  score: number
  notes: string
  action_plan: string
  id: number
  created_at: string
}

const categoryQueries: CategoryQueries = {
  career_work: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  community: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  environment: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  family_friends: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  fun_relaxation: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  growth_learning: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  health_fitness: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  money_finances: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  partner_love: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
  spirituality: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      id: number,
      created_at: string,
    },
  },
};
