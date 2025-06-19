import { MediumText } from '@/components/ui/textDisplay/LargeText'

async function page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-15 pt-0">
      <MediumText text={"My Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}

export default page