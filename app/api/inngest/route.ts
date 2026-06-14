import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { activateSubscriptionFn, cancelSubscriptionFn, markPastDueFn } from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [activateSubscriptionFn, cancelSubscriptionFn, markPastDueFn],
});
