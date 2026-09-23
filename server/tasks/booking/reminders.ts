import { defineTask } from '#imports'
import { sendDueReminders } from '../../utils/reminders'

/** Runs every 10 minutes on a long-running Node host (see nitro.scheduledTasks). */
export default defineTask({
  meta: { name: 'booking:reminders', description: 'Email clients 3 hours before their session' },
  async run() {
    const result = await sendDueReminders()
    if (result.sent.length || result.errors.length) console.log('[reminders]', result)
    return { result }
  }
})
