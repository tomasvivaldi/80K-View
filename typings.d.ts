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

type CategoryFeedbackQueries = {
  [key in CategoryFeedbackKey]: CategoryFeedback;
};

type CategoryFeedback = {
  id: number;
  created_at: string;
  feedback: string; 
  advice1: string;
  advice2: string;
  advice3: string;
  advice4: string;
  advice5: string;
  user_ref: string;
  deleted: boolean;
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

  type CategoryFeedbackKey =
  | 'career_work_feedback'
  | 'community_feedback'
  | 'environment_feedback'
  | 'family_friends_feedback'
  | 'fun_relaxation_feedback'
  | 'growth_learning_feedback'
  | 'health_fitness_feedback'
  | 'money_finances_feedback'
  | 'partner_love_feedback'
  | 'spirituality_feedback';


  type UserDataById = {
    id: number;
    username: string;
    email: string;
    password: string;
    provider: string;
    isActive: boolean;
    created_at: string;
    career_work: Category[];
    career_work_feedback: CategoryFeedback[];
    community: Category[];
    community_feedback: CategoryFeedback[];
    environment: Category[];
    environment_feedback: CategoryFeedback[];
    family_friends: Category[];
    family_friends_feedback: CategoryFeedback[];
    fun_relaxation: Category[];
    fun_relaxation_feedback: CategoryFeedback[];
    growth_learning: Category[];
    growth_learning_feedback: CategoryFeedback[];
    health_fitness: Category[];
    health_fitness_feedback: CategoryFeedback[];
    money_finances: Category[];
    money_finances_feedback: CategoryFeedback[];
    partner_love: Category[];
    partner_love_feedback: CategoryFeedback[];
    spirituality: Category[];
    spirituality_feedback: CategoryFeedback[];
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
  