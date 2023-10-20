type FilterProps = {
  unit: { label: string; value: number };
  line: { label: string; value: number };
};

// type DefectProps = {
//   label: string;
//   value: number;
// };

type CredentialsrProps = {
  userid: number | null;
  username: string | null;
};

export interface StorageFilterProps {
  filters: FilterProps | null;
  setFilter: (filter: FilterProps) => void;
}

export interface StorageCredentialsProps {
  credential: CredentialsrProps | null;
  setUser: (credential: CredentialsrProps) => void;
}

export interface StorageImagesProps {
  images: string[] | string;
  setImages: (state: string) => void;
  // removeImages: (state: string) => void;
}

export interface StorageDefectsProps {
  defects: [];
  setDefect: (defects: []) => void;
}
