export interface AssessmentInput {
  namaSekolah: string;
  kelas: string;
  fase: string;
  materi: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
}

export interface GeneratedAssessment {
  htmlContent: string;
  topic: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}