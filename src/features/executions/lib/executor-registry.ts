import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/trigger/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/trigger/components/google-form-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
	[NodeType.INITIAL]: manualTriggerExecutor,
	[NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
	[NodeType.HTTP_REQUEST]: httpRequestExecutor,
	[NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
	const executor = executorRegistry[type];

	if (!executor) {
		throw new Error(`No executor found for node type: ${type}`);
	}

	return executor;
};
