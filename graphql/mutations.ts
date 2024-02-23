import { gql } from '@apollo/client';

export const ADD_CAREER_WORK_INFO = gql`
  mutation AddCareerWorkInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertCareer_work(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref 
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_COMMUNITY_INFO = gql`
  mutation MyMutation(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertCommunity(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_ENVIRONMENT_INFO = gql`
  mutation AddEnvironmentInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertEnvironment(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_FAMILY_FRIENDS_INFO = gql`
  mutation AddFamilyFriendsInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertFamily_friends(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_FUN_RELAXATION_INFO = gql`
  mutation AddFunRelaxationInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertFun_relaxation(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_GROWTH_LEARNING_INFO = gql`
  mutation AddGrowthLearningInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertGrowth_learning(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_HEALTH_FITNESS_INFO = gql`
  mutation AddHealthFitnessInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertHealth_fitness(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_MONEY_FINANCES_INFO = gql`
  mutation AddMoneyFinancesInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertMoney_finances(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_PARTNER_LOVE_INFO = gql`
  mutation AddPartnerLoveInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertPartner_love(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_SPIRITUALITY_INFO = gql`
  mutation AddSpiritualityInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertSpirituality(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_OVERALL_SCORE = gql`
  mutation AddOverallScoreInfo(
    $username: String!
    $overall_score: Float!
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertOverall_score(
      username: $username
      overall_score: $overall_score
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      overall_score
      recorded_at
      user_ref
    }
  }
`;

export const ADD_OVERALL_ADVICE = gql`
  mutation AddOverallAdviceInfo(
    $advice1: String!
    $advice2: String!
    $advice3: String!
    $advice4: String!
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertOverall_advice(
      advice1: $advice1
      advice2: $advice2
      advice3: $advice3
      advice4: $advice4
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      advice1
      advice2
      advice3
      advice4
      recorded_at
      user_ref
    }
  }
`;

export const ADD_ADVICE = gql`
  mutation AddAdviceInfo(
    $career_work_feedback: String!
    $career_work_advice1: String!
    $career_work_advice2: String!
    $career_work_advice3: String!
    $career_work_advice4: String!
    $career_work_advice5: String!
    $community_feedback: String!
    $community_advice1: String!
    $community_advice2: String!
    $community_advice3: String!
    $community_advice4: String!
    $community_advice5: String!
    $environment_feedback: String!
    $environment_advice1: String!
    $environment_advice2: String!
    $environment_advice3: String!
    $environment_advice4: String!
    $environment_advice5: String!
    $family_friends_feedback: String!
    $family_friends_advice1: String!
    $family_friends_advice2: String!
    $family_friends_advice3: String!
    $family_friends_advice4: String!
    $family_friends_advice5: String!
    $fun_relaxation_feedback: String!
    $fun_relaxation_advice1: String!
    $fun_relaxation_advice2: String!
    $fun_relaxation_advice3: String!
    $fun_relaxation_advice4: String!
    $fun_relaxation_advice5: String!
    $growth_learning_feedback: String!
    $growth_learning_advice1: String!
    $growth_learning_advice2: String!
    $growth_learning_advice3: String!
    $growth_learning_advice4: String!
    $growth_learning_advice5: String!
    $health_fitness_feedback: String!
    $health_fitness_advice1: String!
    $health_fitness_advice2: String!
    $health_fitness_advice3: String!
    $health_fitness_advice4: String!
    $health_fitness_advice5: String!
    $money_finances_feedback: String!
    $money_finances_advice1: String!
    $money_finances_advice2: String!
    $money_finances_advice3: String!
    $money_finances_advice4: String!
    $money_finances_advice5: String!
    $partner_love_feedback: String!
    $partner_love_advice1: String!
    $partner_love_advice2: String!
    $partner_love_advice3: String!
    $partner_love_advice4: String!
    $partner_love_advice5: String!
    $spirituality_feedback: String!
    $spirituality_advice1: String!
    $spirituality_advice2: String!
    $spirituality_advice3: String!
    $spirituality_advice4: String!
    $spirituality_advice5: String!
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertCareer_work_feedback(
      # $ is for the variables
      feedback: $career_work_feedback
      advice1: $career_work_advice1
      advice2: $career_work_advice2
      advice3: $career_work_advice3
      advice4: $career_work_advice4
      advice5: $career_work_advice5
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertCommunity_feedback(
      # $ is for the variables
      feedback: $community_feedback
      advice1: $community_advice1
      advice2: $community_advice2
      advice3: $community_advice3
      advice4: $community_advice4
      advice5: $community_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertEnvironment_feedback(
      # $ is for the variables
      feedback: $environment_feedback
      advice1: $environment_advice1
      advice2: $environment_advice2
      advice3: $environment_advice3
      advice4: $environment_advice4
      advice5: $environment_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertFamily_friends_feedback(
      # $ is for the variables
      feedback: $family_friends_feedback
      advice1: $family_friends_advice1
      advice2: $family_friends_advice2
      advice3: $family_friends_advice3
      advice4: $family_friends_advice4
      advice5: $family_friends_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertFun_relaxation_feedback(
      # $ is for the variables
      feedback: $fun_relaxation_feedback
      advice1: $fun_relaxation_advice1
      advice2: $fun_relaxation_advice2
      advice3: $fun_relaxation_advice3
      advice4: $fun_relaxation_advice4
      advice5: $fun_relaxation_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertGrowth_learning_feedback(
      # $ is for the variables
      feedback: $growth_learning_feedback
      advice1: $growth_learning_advice1
      advice2: $growth_learning_advice2
      advice3: $growth_learning_advice3
      advice4: $growth_learning_advice4
      advice5: $growth_learning_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertHealth_fitness_feedback(
      # $ is for the variables
      feedback: $health_fitness_feedback
      advice1: $health_fitness_advice1
      advice2: $health_fitness_advice2
      advice3: $health_fitness_advice3
      advice4: $health_fitness_advice4
      advice5: $health_fitness_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertMoney_finances_feedback(
      # $ is for the variables
      feedback: $money_finances_feedback
      advice1: $money_finances_advice1
      advice2: $money_finances_advice2
      advice3: $money_finances_advice3
      advice4: $money_finances_advice4
      advice5: $money_finances_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertPartner_love_feedback(
      # $ is for the variables
      feedback: $partner_love_feedback
      advice1: $partner_love_advice1
      advice2: $partner_love_advice2
      advice3: $partner_love_advice3
      advice4: $partner_love_advice4
      advice5: $partner_love_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertSpirituality_feedback(
      # $ is for the variables
      feedback: $spirituality_feedback
      advice1: $spirituality_advice1
      advice2: $spirituality_advice2
      advice3: $spirituality_advice3
      advice4: $spirituality_advice4
      advice5: $spirituality_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
  }
`;


export const ADD_USERS = gql`
  mutation AddUsersInfo(
    $username: String!
    $email: String!
    $recorded_at: DateTime!
    $password: String!
    $provider: String!
    # $isActive: Boolean!
  ) {
    insertUsers(
      username: $username
      email: $email
      recorded_at: $recorded_at
      password: $password
      provider: $provider
      # isActive: $isActive
    ) {
      username
      email
      recorded_at
      password
      provider
    }
  }
`;

export const ADD_USER_PREFERENCES = gql`
  mutation AddUserPreferences($use_case: String!, $reminder_date: String!, $user_ref: Int!, $recorded_at: DateTime) {
    insertUserPreferences(use_case: $use_case, reminder_date: $reminder_date, user_ref: $user_ref, recorded_at: $recorded_at) {
      id
      use_case
      reminder_date
      user_ref
      recorded_at
    }
  }
`;


export const UPDATE_USER_SUBSCRIPTION = gql`
  mutation updateUsers($id: ID!, $isActive: Boolean!) {
    updateUsers(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

export const UPDATE_CAREER_WORK_GOALS = gql`
  mutation updateCareer_work_goals($id: ID!, $goals: JSON!) {
    updateCareer_work_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_COMMUNITY_GOALS = gql`
  mutation updateCommunity_goals($id: ID!, $goals: JSON!) {
    updateCommunity_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_ENVIRONMENT_GOALS = gql`
  mutation updateEnvironment_goals($id: ID!, $goals: JSON!) {
    updateEnvironment_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_FAMILY_FRIENDS_GOALS = gql`
  mutation updateFamily_friends_goals($id: ID!, $goals: JSON!) {
    updateFamily_friends_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_FUN_RELAXATION_GOALS = gql`
  mutation updateFun_relaxation_goals($id: ID!, $goals: JSON!) {
    updateFun_relaxation_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_GROWTH_LEARNING_GOALS = gql`
  mutation updateGrowth_learning_goals($id: ID!, $goals: JSON!) {
    updateGrowth_learning_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_HEALTH_FITNESS_GOALS = gql`
  mutation updateHealth_fitness_goals($id: ID!, $goals: JSON!) {
    updateHealth_fitness_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_MONEY_FINANCES_GOALS = gql`
  mutation updateMoney_finances_goals($id: ID!, $goals: JSON!) {
    updateMoney_finances_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_PARTNER_LOVE_GOALS = gql`
  mutation updatePartner_love_goals($id: ID!, $goals: JSON!) {
    updatePartner_love_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;
export const UPDATE_SPIRITUALITY_GOALS = gql`
  mutation updateSpirituality_goals($id: ID!, $goals: JSON!) {
    updateSpirituality_goals(id: $id, goals: $goals) {
      id
      goals
    }
  }
`;

export const ADD_WIX_SUBSCRIPTION = gql`
  mutation AddWixSubscription($email: String!, $wix_order_id: String!, $data: json!, $recorded_at: DateTime, $updated_at: DateTime) {
    insertWixSubscription(email: $email, wix_order_id: $wix_order_id, data: $data, recorded_at: $recorded_at, updated_at: $updated_at) {
      id
      email
      wix_order_id
      data
      recorded_at
      updated_at
    }
  }
`;


export const mutations = {
  ADD_WIX_SUBSCRIPTION,
  ADD_CAREER_WORK_INFO,
  ADD_COMMUNITY_INFO,
  ADD_ENVIRONMENT_INFO,
  ADD_FAMILY_FRIENDS_INFO,
  ADD_FUN_RELAXATION_INFO,
  ADD_GROWTH_LEARNING_INFO,
  ADD_HEALTH_FITNESS_INFO,
  ADD_MONEY_FINANCES_INFO,
  ADD_PARTNER_LOVE_INFO,
  ADD_SPIRITUALITY_INFO,
  ADD_OVERALL_SCORE,
  ADD_OVERALL_ADVICE,
  ADD_USERS,
  ADD_USER_PREFERENCES,
  ADD_ADVICE,
  UPDATE_USER_SUBSCRIPTION,
  UPDATE_CAREER_WORK_GOALS,
  UPDATE_COMMUNITY_GOALS,
  UPDATE_ENVIRONMENT_GOALS,
  UPDATE_FAMILY_FRIENDS_GOALS,
  UPDATE_FUN_RELAXATION_GOALS,
  UPDATE_GROWTH_LEARNING_GOALS,
  UPDATE_HEALTH_FITNESS_GOALS,
  UPDATE_MONEY_FINANCES_GOALS,
  UPDATE_PARTNER_LOVE_GOALS,
  UPDATE_SPIRITUALITY_GOALS
};
