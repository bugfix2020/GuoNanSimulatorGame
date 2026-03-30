export type PlayerAttributeId =
  | 'force'
  | 'intelligence'
  | 'tenacity'
  | 'compassion'
  | 'apathy';

export type PlayerAttributes = Record<PlayerAttributeId, number>;

export type MbtiCode =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP';

export type PlayerProfile = {
  mbti: MbtiCode;
  attributes: PlayerAttributes;
  source: 'manual' | 'quiz';
};

export type MbtiQuizQuestion = {
  id: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  prompt: string;
  optionA: {
    label: string;
    letter: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
  optionB: {
    label: string;
    letter: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
};

export const MBTI_REFERENCE_LINKS = [
  'https://www.104.com.tw/area/office/article/detail/61964',
  'https://hk.news.yahoo.com/mbti-16%E5%9E%8B%E4%BA%BA%E6%A0%BC%E6%B8%AC%E8%A9%A6%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E3%80%8C%E5%BF%AB%E6%B8%AC%E9%A1%8C%E3%80%8D%E6%B8%AC%E5%87%BA%E9%9A%B1%E8%97%8F%E5%80%8B%E6%80%A7%E3%80%81%E5%88%86%E6%B8%854%E5%A4%A7%E7%B6%AD%E5%BA%A6%E3%80%81%E5%90%84%E9%A1%9E%E5%9E%8B%E4%BA%BA%E6%A0%BC%E7%B0%A1%E4%BB%8B%E5%88%86%E6%9E%90-081031747.html',
];

export const MBTI_TYPES: MbtiCode[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
];

// 题目基于网络常见 MBTI 快测四维度公开解释改写。
export const MBTI_QUIZ_QUESTIONS: MbtiQuizQuestion[] = [
  {
    id: 'q-ei-1',
    dimension: 'EI',
    prompt: '经历高压的一天后，你更容易通过哪种方式恢复状态？',
    optionA: { label: '找朋友聊聊、出去走动', letter: 'E' },
    optionB: { label: '独处整理思绪', letter: 'I' },
  },
  {
    id: 'q-ei-2',
    dimension: 'EI',
    prompt: '在陌生局里你通常会：',
    optionA: { label: '主动破冰并带节奏', letter: 'E' },
    optionB: { label: '先观察再选择沟通对象', letter: 'I' },
  },
  {
    id: 'q-sn-1',
    dimension: 'SN',
    prompt: '面对复杂信息时你更依赖：',
    optionA: { label: '现有事实与细节证据', letter: 'S' },
    optionB: { label: '整体趋势与潜在可能', letter: 'N' },
  },
  {
    id: 'q-sn-2',
    dimension: 'SN',
    prompt: '做决策时你更看重：',
    optionA: { label: '可验证、可复现的经验', letter: 'S' },
    optionB: { label: '前瞻性与新方案空间', letter: 'N' },
  },
  {
    id: 'q-tf-1',
    dimension: 'TF',
    prompt: '冲突发生时你第一反应更偏向：',
    optionA: { label: '讲逻辑和规则边界', letter: 'T' },
    optionB: { label: '先照顾关系和感受', letter: 'F' },
  },
  {
    id: 'q-tf-2',
    dimension: 'TF',
    prompt: '你更认可哪种“正确”？',
    optionA: { label: '客观一致、标准统一', letter: 'T' },
    optionB: { label: '情境合理、人性可承受', letter: 'F' },
  },
  {
    id: 'q-jp-1',
    dimension: 'JP',
    prompt: '你处理任务更像：',
    optionA: { label: '先列计划，再逐项完成', letter: 'J' },
    optionB: { label: '先动起来，边做边调', letter: 'P' },
  },
  {
    id: 'q-jp-2',
    dimension: 'JP',
    prompt: '当计划被打断时你通常会：',
    optionA: { label: '尽快拉回既定节奏', letter: 'J' },
    optionB: { label: '顺势调整并探索新路', letter: 'P' },
  },
];

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function computeAttributesFromMbti(mbti: MbtiCode): PlayerAttributes {
  const result: PlayerAttributes = {
    force: 50,
    intelligence: 50,
    tenacity: 50,
    compassion: 50,
    apathy: 50,
  };

  for (const char of mbti.split('')) {
    switch (char) {
      case 'E':
        result.force += 8;
        result.apathy += 4;
        result.compassion -= 2;
        break;
      case 'I':
        result.intelligence += 6;
        result.tenacity += 4;
        break;
      case 'S':
        result.force += 4;
        result.tenacity += 4;
        break;
      case 'N':
        result.intelligence += 8;
        result.compassion += 2;
        break;
      case 'T':
        result.intelligence += 4;
        result.apathy += 8;
        result.compassion -= 6;
        break;
      case 'F':
        result.compassion += 10;
        result.tenacity += 2;
        result.apathy -= 4;
        break;
      case 'J':
        result.tenacity += 8;
        result.intelligence += 2;
        break;
      case 'P':
        result.force += 2;
        result.compassion += 2;
        break;
      default:
        break;
    }
  }

  return {
    force: clamp(result.force),
    intelligence: clamp(result.intelligence),
    tenacity: clamp(result.tenacity),
    compassion: clamp(result.compassion),
    apathy: clamp(result.apathy),
  };
}

export function buildProfileByMbti(
  mbti: MbtiCode,
  source: 'manual' | 'quiz'
): PlayerProfile {
  return {
    mbti,
    attributes: computeAttributesFromMbti(mbti),
    source,
  };
}

export function deriveMbtiFromQuizAnswers(
  answers: Record<string, 'A' | 'B'>
): MbtiCode {
  const counter = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  MBTI_QUIZ_QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (answer === 'A') {
      counter[question.optionA.letter] += 1;
    }
    if (answer === 'B') {
      counter[question.optionB.letter] += 1;
    }
  });

  const mbti = `${counter.E >= counter.I ? 'E' : 'I'}${
    counter.S >= counter.N ? 'S' : 'N'
  }${counter.T >= counter.F ? 'T' : 'F'}${
    counter.J >= counter.P ? 'J' : 'P'
  }` as MbtiCode;

  return mbti;
}
