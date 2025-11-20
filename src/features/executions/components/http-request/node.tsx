"use client";

import { memo, useState } from "react";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestFormValue, HttpRequestDialog } from "./dialog";

export type HttpRequestNodeData = {
	endpoint?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: string;
};

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeData>) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { setNodes } = useReactFlow();

	const handleOpenSettings = () => setDialogOpen(true);

	const nodeStatus = "initial";

	const nodeData = props.data;
	const description = nodeData?.endpoint
		? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
		: "Not configured";

	const handleSubmit = (values: HttpRequestFormValue) => {
		setNodes((nodes) =>
			nodes.map((node) => {
				if (node.id === props.id) {
					return {
						...node,
						data: {
							...node.data,
							...values,
						},
					};
				}
				return node;
			})
		);
	};

	return (
		<>
			<HttpRequestDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSubmit={handleSubmit}
				defaultValues={nodeData}
			/>
			<BaseExecutionNode
				{...props}
				id={props.id}
				icon={GlobeIcon}
				name="HTTP Request"
				status={nodeStatus}
				description={description}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
});

HttpRequestNode.displayName = "HttpRequestNode";
