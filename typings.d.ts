type community = {
  username: string;
  score: number;
  notes: string;
  action_plan: string;
  id: number;
  created_at: string;
};

type Category = {
  __typename: string;
  username: string;
  score: number;
  notes: string;
  action_plan: string;
  id: number;
  created_at: string;
  documentNode: DocumentNode;
};

type CategoryQueries = {
  [key in CategoryKey]: Category;
};

type DocumentNode = {
  username: string;
  score: number;
  notes: string;
  action_plan: string;
  id: number;
  created_at: string;
};

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

type CategoryKey =
  | 'career_work'
  | 'community'
  | 'environment'
  | 'family_friends'
  | 'fun_relaxation'
  | 'growth_learning'
  | 'health_fitness'
  | 'money_finances'
  | 'partner_love'
  | 'spirituality';


  type UserDataById = {
    id: number;
    username: string;
    email: string;
    password: string;
    provider: string;
    created_at: string;
    career_work: Category[];
    community: Category[];
    environment: Category[];
    family_friends: Category[];
    fun_relaxation: Category[];
    growth_learning: Category[];
    health_fitness: Category[];
    money_finances: Category[];
    partner_love: Category[];
    spirituality: Category[];
    overall_score: {
      id: number;
      created_at: string;
      overall_score: number;
      user_ref: string;
      username: string;
    }[];
    overall_advice: {
      id: number;
      created_at: string;
      advice1: string;
      advice2: string;
      advice3: string;
      advice4: string;
      user_ref: string;
    }[];
  };
  
  type UserDataByIdData = {
    userDataById: UserDataById;
  };
  