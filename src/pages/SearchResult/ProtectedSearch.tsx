import { Navigate, useSearchParams } from 'react-router-dom';

const ProtectedSearch = ({ children }: any) => {
  const [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  let key = searchParams.get("key");

  let isSearching = category && category?.length > 2 && key && key?.length > 2;

  if (!isSearching) {
    Navigate({ to: "/", replace: true })
  } else
    return children;
}

export default ProtectedSearch