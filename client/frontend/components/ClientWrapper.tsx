import { useSyncFlask } from "@/app/hooks/useSyncFlask";

export default function ClientAuthWrapper({children}: {children: React.ReactNode}){
  useSyncFlask();
  return <>{children}</>
}