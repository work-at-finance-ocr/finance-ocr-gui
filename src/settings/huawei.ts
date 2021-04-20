// huawei cloud config
import fs from "fs";
import axios from "axios";

export const HuaweiCloud = {
  EndPoint: "ocr.cn-north-4.myhuaweicloud.com",
  ProjectId: "0930b25cae00f4d72fffc013d9ceefda",
  getAPI(api: string) {
    return `https://${this.EndPoint}/v2/${this.ProjectId}${api}`;
  },
};

export enum API_OCR {
  API_OCR_GENERAL_TEXT = "/ocr/general-text",
  API_OCR_WEB_IMAGE = "/ocr/web-image",
}

const HuaweiAccount = {
  username: "hw86198387",
  password: "znstjz2020",
  domain_name: "hw86198387",
  project_name: "cn-north-4",
};
const HuaweiTokenParams = {
  auth: {
    identity: {
      methods: ["password"],
      password: {
        user: {
          name: HuaweiAccount.username, //替换为实际用户名
          password: HuaweiAccount.password, //替换为实际的用户密码
          domain: {
            name: HuaweiAccount.domain_name, //替换为实际账号名
          },
        },
      },
    },
    scope: {
      project: {
        name: HuaweiAccount.project_name, //替换为实际的project name，如cn-north-4
      },
    },
  },
};
// cloud
export const TokenPath = "huawei-token.text";
export const getToken = async () => {
  if (fs.existsSync(TokenPath)) {
    console.log("reading token from local");
    return fs.readFileSync(TokenPath, "utf-8");
  }

  console.log("===== fetching token from net ======");
  const url = "https://iam.myhuaweicloud.com/v3/auth/tokens?nocatalog=true";
  const res = await axios.post(url, HuaweiTokenParams, {
    headers: { "Content-Type": "application/json;charset=utf8" },
  });
  console.log("==== fetched token ==== ");
  const token = res.headers["x-subject-token"];
  fs.writeFile(TokenPath, token, (err) => {
    console.warn("write token error", err);
  });
  return token;
};