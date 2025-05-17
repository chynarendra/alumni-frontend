import { JobType } from "@/enum/JobType";
import { IOption } from "@/type/IOption";

export function htmlToText(html: string): string {
  if (typeof window === 'undefined') {
    // SSR-safe fallback: crude regex
    return html.replace(/<[^>]+>/g, '');
  }
  // Browser: use DOMParser for safer decoding
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function getJobTypeOptions(): IOption[] {
  const labelMap: Record<JobType, string> = {
    [JobType.FullTime]: 'Full‑time',
    [JobType.PartTime]: 'Part‑time',
    [JobType.Contract]: 'Contract',
    [JobType.Internship]: 'Internship',
  };

  return Object.values(JobType).map((v) => ({
    value: v,
    label: labelMap[v],
  }));
}

export const formatToYearMonthDay = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
