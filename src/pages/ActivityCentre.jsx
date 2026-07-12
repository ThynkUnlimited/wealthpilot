import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import ActivityTimeline from "../components/activity/ActivityTimeline"

export default function ActivityCentre() {

  return (

    <AppLayout>

      <PageHeader

        title="Activity Centre"

        subtitle="Track every important activity in WealthPilot."

      />

      <ActivityTimeline />

    </AppLayout>

  )

}