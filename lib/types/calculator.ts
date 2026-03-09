export type SendOtpRequest = {
  email: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type GenerateReportRequest = {
  fullName: string;
  email: string;
  mobile: string;
  investorType: string;
  activity: string;
  city: string;
  timeline: string;
  visas: number;
  bankSupport: boolean;
  accountingSupport: boolean;
  vroSupport: boolean;
};