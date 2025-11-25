import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { GoogleFormTrigger } from "@/features/trigger/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/trigger/components/manual-trigger/node";
import { StripeTriggerNode } from "@/features/trigger/components/stripe-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
	[NodeType.INITIAL]: InitialNode,
	[NodeType.HTTP_REQUEST]: HttpRequestNode,
	[NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
	[NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
	[NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
