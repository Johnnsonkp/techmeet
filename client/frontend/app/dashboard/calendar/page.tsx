import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'

import CustomCalendar from '@/components/calendar/CustomCalendar'
import React from 'react'

async function page() {

  return (
    <div id="userdDashboard" className="dashboardHidden flex flex-1 flex-col gap-4 p-15 pt-0">
      <CustomCalendar />
    </div>
  )
}

export default page