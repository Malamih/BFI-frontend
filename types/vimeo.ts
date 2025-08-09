export interface GetSingleVideoResponse {
  uri: string;
  name: string;
  description: string | null;
  type: string;
  link: string;
  duration: number;
  width: number;
  height: number;
  created_time: string;
  modified_time: string;
  pictures: {
    uri: string;
    base_link: string;
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  files?: Array<{
    quality: string;
    width: number;
    height: number;
    link: string;
    public_name: string;
    type: string;
  }>;
  [key: string]: any;
}
