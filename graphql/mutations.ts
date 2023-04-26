import { gql } from '@apollo/client';

export const ADD_CAREER_WORK_INFO = gql`
  mutation AddCareerWorkInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertCareer_work(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_COMMUNITY_INFO = gql`
  mutation MyMutation(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertCommunity(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_ENVIRONMENT_INFO = gql`
  mutation AddEnvironmentInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertEnvironment(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_FAMILY_FRIENDS_INFO = gql`
  mutation AddFamilyFriendsInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertFamily_friends(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_FUN_RELAXATION_INFO = gql`
  mutation AddFunRelaxationInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertFun_relaxation(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_GROWTH_LEARNING_INFO = gql`
  mutation AddGrowthLearningInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertGrowth_learning(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_HEALTH_FITNESS_INFO = gql`
  mutation AddHealthFitnessInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertHealth_fitness(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_MONEY_FINANCES_INFO = gql`
  mutation AddMoneyFinancesInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertMoney_finances(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_PARTNER_LOVE_INFO = gql`
  mutation AddPartnerLoveInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertPartner_love(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_SPIRITUALITY_INFO = gql`
  mutation AddSpiritualityInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $created_at: DateTime!
  ) {
    insertSpirituality(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      created_at: $created_at
    ) {
      username
      score
      notes
      action_plan
    }
  }
`;

export const ADD_OVERALL_SCORE = gql`
  mutation AddOverallScoreInfo(
    $username: String!
    $overall_score: Float!
    $created_at: DateTime!
  ) {
    insertOverall_score(
      username: $username
      overall_score: $overall_score
      created_at: $created_at # spirituality_id: $spirituality_id # community_id: $community_id # environment_id: $environment_id # career_work_id: $career_work_id # fun_relaxation_id: $fun_relaxation_id # money_finances_id: $money_finances_id # partner_love_id: $partner_love_id # health_fitness_id: $health_fitness_id # family_friends_id: $family_friends_id # growth_learning_id: $growth_learning_id
    ) {
      username
      overall_score
      created_at
    }
  }
`;

export const mutations = {
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
};
