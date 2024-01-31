import {
    ArrowDownToLine,
    ArrowRightToLine,
    ArrowUpCircle,
    ArrowUpToLine,
    CheckCircle2,
    Circle,
    HelpCircle,
    XCircle,
} from "lucide-react"

export const labels = [
  {
    value: "First iteration",
    label: "First iteration",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "BACKLOG",
    label: "BACKLOG",
    icon: HelpCircle,
  },
  {
    value: "PRIORITZADA",
    label: "TODO",
    icon: Circle,
  },
  {
    value: "EN PROGRES",
    label: "INPROGRESS",
    icon: ArrowUpCircle,
  },
  {
    value: "EN VERIFICACIO",
    label: "VERIFY",
    icon: CheckCircle2,
  },
  {
    value: "FINALITZADA",
    label: "DONE",
    icon: XCircle,
  },
]


export const taskstatuses = [
  {
    value: "FINALITZADA",
    label: "DONE",
    icon: HelpCircle,
  },
  {
    value: "EN PROGRES",
    label: "INPROGRESS",
    icon: Circle,
  },
  {
    value: "DEFINIDA",
    label: "DEFINED",
    icon: ArrowUpCircle,
  }
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
]
