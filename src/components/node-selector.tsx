import { NodeType } from "@prisma/client";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { ComponentType, useCallback } from "react";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import { createId } from "@paralleldrive/cuid2";

export type NodeTypeOption = {
	type: NodeType;
	label: string;
	description: string;
	icon: ComponentType<{ className?: string }> | string;
};

export const triggerNodes: NodeTypeOption[] = [
	{
		type: NodeType.MANUAL_TRIGGER,
		label: "Trigger manually",
		description:
			"Runs the flow on clicking a button. Good for getting started quickly.",
		icon: MousePointerIcon,
	},
	{
		type: NodeType.GOOGLE_FORM_TRIGGER,
		label: "Google Form",
		description: "Runs the flow when a Google Form is submitted.",
		icon: "/logos/googleform.svg",
	},
	{
		type: NodeType.STRIPE_TRIGGER,
		label: "Stripe Trigger",
		description: "Runs the flow when a Stripe event is captured.",
		icon: "/logos/stripe.svg",
	},
];

export const executionNodes: NodeTypeOption[] = [
	{
		type: NodeType.HTTP_REQUEST,
		label: "HTTP Request",
		description: "Makes an HTTP request",
		icon: GlobeIcon,
	},
	{
		type: NodeType.GEMINI,
		label: "Gemini",
		description: "Uses Google Gemini to generate text",
		icon: "/logos/gemini.svg",
	},
	{
		type: NodeType.OPENAI,
		label: "OpenAI",
		description: "Uses OpenAI to generate text",
		icon: "/logos/openai.svg",
	},
	{
		type: NodeType.ANTHROPIC,
		label: "Anthropic",
		description: "Uses Anthropic to generate text",
		icon: "/logos/anthropic.svg",
	},
	{
		type: NodeType.DISCORD,
		label: "Discord",
		description: "Send text to Discord",
		icon: "/logos/discord.svg",
	},
	{
		type: NodeType.SLACK,
		label: "Slack",
		description: "Send text to Slack",
		icon: "/logos/slack.svg",
	},
];

interface NodeSelectorProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

export function NodeSelector({
	open,
	onOpenChange,
	children,
}: NodeSelectorProps) {
	const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

	const handleNodeSelect = useCallback(
		(selection: NodeTypeOption) => {
			// Check if trying to add a manual trigger when one already exists
			if (selection.type === NodeType.MANUAL_TRIGGER) {
				const nodes = getNodes();

				const hasManualTrigger = nodes.some(
					(node) => node.type === NodeType.MANUAL_TRIGGER
				);

				if (hasManualTrigger) {
					toast.error(
						"Only one manual trigger is allowed per workflow"
					);
					return;
				}
			}

			setNodes((nodes) => {
				// Check if an Initial node already exists
				const hasInitialTrigger = nodes.some(
					(node) => node.type === NodeType.INITIAL
				);

				// Calculate random offset position near center of screen
				const centerX = window.innerWidth / 2;
				const centerY = window.innerHeight / 2;

				const flowPosition = screenToFlowPosition({
					x: centerX + (Math.random() - 0.5) * 200,
					y: centerY + (Math.random() - 0.5) * 200,
				});

				const newNode = {
					id: createId(),
					type: selection.type,
					position: flowPosition,
					data: {},
				};

				// If this is the first node (only allow one initial trigger)
				if (hasInitialTrigger) {
					return [newNode];
				}

				return [...nodes, newNode];
			});

			onOpenChange(false);
		},
		[getNodes, setNodes, onOpenChange, screenToFlowPosition]
	);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side="right"
				className="w-full sm:max-w-md overflow-y-auto"
			>
				<SheetHeader>
					<SheetTitle>What triggers this workflow?</SheetTitle>
					<SheetDescription>
						A trigger is a step that starts your workflow.
					</SheetDescription>
				</SheetHeader>
				<div>
					{triggerNodes.map((nodeType) => {
						const Icon = nodeType.icon;
						return (
							<div
								key={nodeType.type}
								className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border border-transparent hover:border-l-primary"
								onClick={() => handleNodeSelect(nodeType)}
							>
								<div className="flex items-center gap-6 w-full overflow-hidden">
									{typeof Icon === "string" ? (
										<img
											src={Icon}
											alt={nodeType.label}
											className="size-5 object-contain rounded"
										/>
									) : (
										<Icon className="size-5" />
									)}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">
											{nodeType.label}
										</span>
										<span className="text-xs text-muted-foreground">
											{nodeType.description}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Separator />
				<div>
					{executionNodes.map((nodeType) => {
						const Icon = nodeType.icon;
						return (
							<div
								key={nodeType.type}
								className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border border-transparent hover:border-l-primary"
								onClick={() => handleNodeSelect(nodeType)}
							>
								<div className="flex items-center gap-6 w-full overflow-hidden">
									{typeof Icon === "string" ? (
										<img
											src={Icon}
											alt={nodeType.label}
											className="size-5 object-contain rounded"
										/>
									) : (
										<Icon className="size-5" />
									)}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">
											{nodeType.label}
										</span>
										<span className="text-xs text-muted-foreground">
											{nodeType.description}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
