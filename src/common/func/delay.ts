export async function delay(duration: number) {
	return await new Promise((resolve) => setTimeout(resolve, duration));
}
