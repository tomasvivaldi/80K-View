type Item = {
  description: string;
  isChecked: boolean;
}
type Goal = {
  items: Item[]
}

type Category = {
  __typename: string;
  username: string;
  score: number | null;
  notes: string;
  action_plan: string;
  id: number;
  created_at: string;
  recorded_at: string;
  goals: Goal;
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
  recorded_at: string;
  feedback: string; 
  advice1: string;
  advice2: string;
  advice3: string;
  advice4: string;
  advice5: string;
  goals: object;
  user_ref: string;
  deleted: boolean;
};

type DocumentNode = {
  username: string;
  score: number;
  notes: string;
  action_plan: string;
  goals: JSON;
  id: number;
  created_at: string;
  recorded_at: string;
};

const categoryQueries: CategoryQueries = {
  career_work: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  community: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  environment: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  family_friends: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  fun_relaxation: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  growth_learning: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  health_fitness: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  money_finances: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  partner_love: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
    },
  },
  spirituality: {
    documentNode: {
      username: string,
      score: number,
      notes: string,
      action_plan: string,
      goals: JSON,
      id: number,
      created_at: string,
      recorded_at: string,
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
      recorded_at: string;
      overall_score: number;
      user_ref: string;
      username: string;
    }[];
    overall_advice: {
      id: number;
      created_at: string;
      recorded_at: string;
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

  type WixSubscription = {
    id: string;
    email: string;
    wix_order_id: string;
    data: WixSubscriptionData;
    recorded_at: Date | string;
    updated_at: Date | string;
  };

  type WixSubscriptionData = {
    plan_valid_until: string;
    plan_order_id: string;
    context: WixSubscriptionContext;
    _context: {
      activation: any; // Adjust as necessary for your project's structure
      configuration: any;
      app: any;
      action: any;
      trigger: any;
    };
    plan_description: string;
    contact: WixSubscriptionContact;
    plan_id: string;
    site_name: string;
    plan_title: string;
    plan_price: WixSubscriptionPlanPrice;
    plan_start_date: string;
    contact_id: string;
    plan_cycle_duration: string;
  };


  type WixSubscriptionContext = {
    metaSiteId: string;
    activationId: string;
  };

  type WixSubscriptionContact = {
    emails: string[]; // Assuming emails is an array of strings
    phone: string;
    email: string;
  };

  type WixSubscriptionPlanPrice = {
    value: string;
    currency: string;
  };
