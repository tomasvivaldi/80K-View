import { gql } from '@apollo/client';

// export const GET_CATEGORY_INFO_BY_USER = gql`
//     query MyQuery($username: String!) {
//      communityListByUser(username: $username) {
//       username
//       score
//     }
//   }
// `;

// export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
//     query MyQuery($username: String!) {
//       communityListByUserLatest(username: $username) {
//       username
//       score
//       notes
//       action_plan
//     }
//   }
// `;


export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    categoryListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

// queries.ts 

export const GET_CAREER_WORK_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    careerWorkListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_COMMUNITY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    communityListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_ENVIRONMENT_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    environmentListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    familyFriendsListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_FUN_RELAXATION_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    funRelaxationListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_GROWTH_LEARNING_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    growthLearningListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_HEALTH_FITNESS_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    healthFitnessListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_MONEY_FINANCES_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    moneyFinancesListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_PARTNER_LOVE_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    partnerLoveListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_SPIRITUALITY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    spiritualityListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

// export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
//     query MyQuery($username: String!) {
//       categoryListByUserLatest(username: $username) {
//       recorded_at
//       username
//       score
//       notes
//       action_plan
//     }
//   }
// `;

export const GET_CAREER_WORK_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    careerWorkListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_COMMUNITY_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    communityListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_ENVIRONMENT_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    environmentListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_FAMILY_FRIENDS_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    familyFriendsListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_FUN_RELAXATION_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    funRelaxationListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_GROWTH_LEARNING_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    growthLearningListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_HEALTH_FITNESS_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    healthFitnessListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_MONEY_FINANCES_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    moneyFinancesListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_PARTNER_LOVE_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    partnerLoveListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_SPIRITUALITY_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    spiritualityListByUser(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

export const GET_OVERALL_SCORE_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    overallScoreListByUser(username: $username) {
      id
      recorded_at
      username
      overall_score
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    userByEmail(email: $email) {
      id
      username
      email
      created_at
      password
      provider
      isActive
    }
  }
`;

export const GET_USER_DATA_BY_ID = gql`
  query MyQuery($id: ID!) {
    userDataById(id: $id) {
    created_at
    email
    id
    password
    provider
    isActive
    username
    career_work {
      goals
      action_plan
      recorded_at
      notes
      score
      id
      username
      user_ref
    }
    career_work_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      goals
      id
      recorded_at
      user_ref
    }
    community {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    community_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    environment {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    environment_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    family_friends {
      id
      goals
      action_plan
      recorded_at
      score
      notes
      user_ref
      username
    }
    family_friends_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    fun_relaxation {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    fun_relaxation_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    growth_learning {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    growth_learning_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    health_fitness {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    health_fitness_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    money_finances {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    money_finances_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    overall_score {
      id
      recorded_at
      overall_score
      user_ref
      username
    }
    partner_love {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    partner_love_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    spirituality {
      id
      goals
      action_plan
      recorded_at
      notes
      score
      user_ref
      username
    }
    spirituality_feedback {
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      id
      recorded_at
      user_ref
    }
    overall_advice {
      id
      user_ref
      recorded_at
      advice1
      advice2
      advice3
      advice4
    }
    }
  }
`;

export const GET_WIX_SUBSCRIPTION_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    wixSubscriptionEmail(email: $email) {
      id
      username
      email
      created_at
      password
      provider
      isActive
    }
  }
`;

export const queries = {
  GET_USER_BY_EMAIL,
  GET_USER_DATA_BY_ID,
  GET_OVERALL_SCORE_INFO_BY_USER,
  GET_CAREER_WORK_INFO_BY_USER,
  GET_COMMUNITY_INFO_BY_USER,
  GET_ENVIRONMENT_INFO_BY_USER,
  GET_FAMILY_FRIENDS_INFO_BY_USER,
  GET_FUN_RELAXATION_INFO_BY_USER,
  GET_GROWTH_LEARNING_INFO_BY_USER,
  GET_HEALTH_FITNESS_INFO_BY_USER,
  GET_MONEY_FINANCES_INFO_BY_USER,
  GET_PARTNER_LOVE_INFO_BY_USER,
  GET_SPIRITUALITY_INFO_BY_USER,
  GET_CAREER_WORK_INFO_BY_USER_LATEST,
  GET_COMMUNITY_INFO_BY_USER_LATEST,
  GET_ENVIRONMENT_INFO_BY_USER_LATEST,
  GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST,
  GET_FUN_RELAXATION_INFO_BY_USER_LATEST,
  GET_GROWTH_LEARNING_INFO_BY_USER_LATEST,
  GET_HEALTH_FITNESS_INFO_BY_USER_LATEST,
  GET_MONEY_FINANCES_INFO_BY_USER_LATEST,
  GET_PARTNER_LOVE_INFO_BY_USER_LATEST,
  GET_SPIRITUALITY_INFO_BY_USER_LATEST,
};