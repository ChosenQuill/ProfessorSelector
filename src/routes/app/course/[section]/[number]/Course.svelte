<script>
	export let info;
	let desc;
	$: {
		const re = /(.+hours?\)) (.+) Prerequisites?:.*/g;
		const res = re.exec(info.description);
		desc = res ? res[2] : info.description;
	}

</script>

<h3 class="text-2xl">
	<span class="font-bold">{info.title}</span><span>&nbsp;(Fall 2024)</span>
</h3>

<p class="my-2">{desc}</p>
