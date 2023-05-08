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
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

// queries.ts

export const GET_CAREER_WORK_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    careerWorkListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_COMMUNITY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    communityListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_ENVIRONMENT_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    environmentListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    familyFriendsListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_FUN_RELAXATION_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    funRelaxationListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_GROWTH_LEARNING_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    growthLearningListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_HEALTH_FITNESS_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    healthFitnessListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_MONEY_FINANCES_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    moneyFinancesListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_PARTNER_LOVE_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    partnerLoveListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_SPIRITUALITY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    spiritualityListByUserLatest(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

// export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
//     query MyQuery($username: String!) {
//       categoryListByUserLatest(username: $username) {
//       created_at
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
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_COMMUNITY_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    communityListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_ENVIRONMENT_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    environmentListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_FAMILY_FRIENDS_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    familyFriendsListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_FUN_RELAXATION_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    funRelaxationListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_GROWTH_LEARNING_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    growthLearningListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_HEALTH_FITNESS_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    healthFitnessListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_MONEY_FINANCES_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    moneyFinancesListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_PARTNER_LOVE_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    partnerLoveListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_SPIRITUALITY_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    spiritualityListByUser(username: $username) {
      id
      created_at
      username
      score
      notes
      action_plan
    }
  }
`;

export const GET_OVERALL_SCORE_INFO_BY_USER = gql`
  query MyQuery($username: String!) {
    overallScoreListByUser(username: $username) {
      id
      created_at
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
    }
  }
`;

export const GET_USER_DATA_BY_ID = gql`
  query MyQuery($id: String!) {
    userDataById(id: $id) {
      username
      email
      cw_score
      cw_notes
      cw_action_plan
      c_score
      c_notes
      c_action_plan
      e_score
      e_notes
      e_action_plan
      ff_score
      ff_notes
      ff_action_plan
      fr_score
      fr_notes
      fr_action_plan
      gl_score
      gl_notes
      gl_action_plan
      hf_score
      hf_notes
      hf_action_plan
      mf_score
      mf_notes
      mf_action_plan
      pl_score
      pl_notes
      pl_action_plan
      s_score
      s_notes
      s_action_plan
      overall_score
      overall_created_at
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
