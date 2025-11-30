function showChord() {
	let root = document.getElementById("root").value;
	let quality = document.getElementById("quality").value;
	let extension = document.getElementById("extension").value;

	const container = document.getElementById("result");
	container.innerHTML = ""; // 결과 초기화

	let errors = [];
	if (!root) errors.push("Root Note");
	if (!quality) errors.push("Quality");
	if (!extension) errors.push("Extension");

	if (errors.length > 0) {
		container.innerHTML = `<p class="error">Please select: ${errors.join(", ")}</p>`;
		return;
	}

	// Extension이 None이면 표시 안 함
	let chordNameDisplay = root + (quality ? " " + quality : "") + (extension && extension !== "None" ? extension : "");
	container.innerHTML = `<h3>${chordNameDisplay}</h3>`;

	// 파일명용으로 root 정리
	const rootMap = {
		"C# (Db)": "CSharp",
		"D# (Eb)": "DSharp",
		"F# (Gb)": "FSharp",
		"G# (Ab)": "GSharp",
		"A# (Bb)": "ASharp"
	};
	let rootFile = rootMap[root] || root;
	rootFile = rootFile.replace(/\s/g, "");
	let qualityFile = quality ? quality.replace(/\s/g, "") : "";
	let extensionFile = (extension && extension !== "None") ? extension.replace(/\s/g, "") : "";

	let chordFileBase = rootFile + qualityFile + extensionFile;

	const maxImages = 5;
	for (let i = 1; i <= maxImages; i++) {
		const imgSrc = `/Chordy/img/chords/${chordFileBase}${i}.png`;
		const img = new Image();
		img.src = imgSrc;
		img.onload = function () {
			container.appendChild(img);
		};
	}

}
