import { ref } from "vue";

// 自分のエンドポイントに置き換えてください
export const baseUrl = 'https://rb2c4ii1nl.execute-api.ap-northeast-1.amazonaws.com';

//ローディングアニメーションフラグ
export let isLoading = ref(false);

//料理ジャンルのデータ
export const cookingGenre = [
    { text: "中華" },
    { text: "和食" },
    { text: "洋食" },
    { text: "韓国料理" },
];

//アレルギー項目のデータ
export const allergyOptions = [
    { text: "卵" },
    { text: "乳" },
    { text: "小麦" },
    { text: "そば" },
    { text: "落花生" },
    { text: "大豆" },
    { text: "魚" },
    { text: "甲殻類" },
    { text: "ナッツ類" },
    { text: "ゴマ" },
    { text: "コーン" },
    { text: "カゼイン" },
    { text: "イースト" },
    { text: "肉類" },
    { text: "シナモン" },
];

//嫌いな食べ物データ
export const dislikeOptions = [
    { text: "ピーマン" },
    { text: "ブロッコリー" },
    { text: "ナス" },
    { text: "にんじん" },
    { text: "トマト" },
    { text: "きのこ" },
    { text: "ほうれん草" },
    { text: "玉ねぎ" },
    { text: "セロリ" },
    { text: "ズッキーニ" },
    { text: "米" },
];

//子供に対する悩みデータ
export const healthConcerns = [
    { text: "肥満" },
    { text: "肝脂肪" },
    { text: "高血圧" },
    { text: "糖尿病" },
    { text: "消化不良" },
    { text: "アレルギー悪化" },
    { text: "成長障害" },
    { text: "痩せ症" },
    { text: "鉄欠乏性貧血" },
    { text: "免疫力低下" },
    { text: "虫歯" }
  ];