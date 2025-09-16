"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AvatarCompProps = {
	className?: string
}

export default function AvatarComp({ className }: AvatarCompProps) {
	return (
		<div className={className}>
			<Avatar>
				<AvatarImage src="/avatar_icon.jpg" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	)
}

