// Citable assets: the "diagnosis + claim" shape that business-continuity and
// risk vendors actually link to. A framework spec does not earn citations; a
// named failure mode with a falsifiable claim and a quotable line does.
//
// Every claim here is a practitioner field observation from Zeeshan Sabri's
// own engagements and is labelled as such. Do not add third-party statistics
// unless a real, linkable source accompanies them.

export type CitableAsset = {
  /** The lead diagnosis — a falsifiable claim, not a description. */
  claim: string;
  /** Short supporting argument for the claim. */
  diagnosis: string[];
  /** The named failure mode a vendor can reference in a single sentence. */
  failureMode: {
    name: string;
    definition: string;
    /** How a reader confirms they have it. */
    tells: string[];
  };
  /** Designed to be screenshot and attributed. Keep under ~200 characters. */
  pullQuote: string;
  /** Attribution line rendered under the pull quote. */
  attribution: string;
  /** Source basis for the claim, stated plainly for citation integrity. */
  basis: string;
  /** HowTo steps for schema + the remediation section. */
  howTo: { name: string; text: string }[];
  /** ISO date the asset was last substantively revised. */
  datePublished: string;
};

export const CITABLE_ASSETS: Record<string, CitableAsset> = {
  "8c-crisis-to-clarity": {
    claim:
      "Most organisations do not fail a crisis at the moment of impact. They fail roughly six weeks later, when the emergency structure that carried them through week one quietly becomes the permanent operating model — and nobody decides to end it.",
    diagnosis: [
      "Crisis response is designed as a temporary override: a war room, a daily stand-up, a single decision-maker, suspended approval thresholds. That override works, and because it works, it is never switched off.",
      "The override has no owner and no exit criteria, so it cannot be retired by anyone. It decays instead — the war room thins out, the daily call drifts to weekly, the suspended thresholds are never restored, and authority ends up parked with whoever happened to hold it on the worst day.",
      "The result is an organisation that has technically recovered while structurally still operating in emergency mode: decisions concentrated, ownership ambiguous, and a governance layer that formally exists but no longer binds anything.",
      "This is why the second incident is usually handled worse than the first. The organisation has not returned to a baseline it can escalate from — it never left the last escalation.",
    ],
    failureMode: {
      name: "The Continuity Gap",
      definition:
        "The unmanaged interval between the end of a crisis and the restoration of normal decision rights, during which emergency authority persists without a mandate, an owner, or an expiry date.",
      tells: [
        "No written exit criteria existed for the crisis structure when it was stood up.",
        "Approval thresholds relaxed during the incident have not been formally restored.",
        "The incident lead still signs off on decisions outside their standing remit.",
        "The post-incident review produced lessons but no change to decision rights.",
        "Nobody can name the date the organisation returned to normal operations.",
      ],
    },
    pullQuote:
      "Recovery is not the absence of crisis. It is the deliberate return of decision rights to the people who are supposed to hold them.",
    attribution: "Zeeshan Sabri, Crisis-to-Clarity Architect",
    basis:
      "Practitioner field observation drawn from transformation, procurement, and leadership engagements across the GCC and South Asia. Presented as a diagnostic pattern, not a statistical finding.",
    howTo: [
      {
        name: "Date the gap",
        text: "Write down the date the crisis structure was stood up and the date normal decision rights were formally restored. If the second date does not exist, the Continuity Gap is still open and its length is measured to today.",
      },
      {
        name: "Inventory borrowed authority",
        text: "List every approval threshold, sign-off, and decision right that moved during the incident, and who currently holds each one. Borrowed authority that was never returned is the substance of the gap.",
      },
      {
        name: "Set expiry criteria retroactively",
        text: "For each item on the inventory, write the specific condition under which it returns to its standing owner. A condition, not a date — dates slip silently, conditions can be tested.",
      },
      {
        name: "Restore in one visible act",
        text: "Close the gap with a single announced restoration rather than a gradual drift. Ambiguity about when normal resumed is what makes the next escalation start from the wrong baseline.",
      },
      {
        name: "Install the exit before the next entry",
        text: "Amend the crisis playbook so that standing up an emergency structure requires naming its owner and its exit criteria in the same document. This is the only step that prevents recurrence.",
      },
    ],
    datePublished: "2026-08-01",
  },
};
