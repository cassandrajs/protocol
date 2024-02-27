import * as child_press from "child_process"
import * as fs from "fs"
import * as os from "os"
import * as path from "path"
import * as url from "url"
import * as glob from "glob"

function makeIndex(folder) {
	folder = folder.replaceAll("\\", "/")
	console.log("making index for", folder)
	let indexLines = []

	const files = new glob.sync(folder + "/*.{ts,tsx}", {})
	for (const file of files) {
		indexLines.push(
			`export * from './${path.basename(file, path.extname(file))}'`
		)
	}

	const folders = new glob.sync(folder + "/*/", {})
	for (const fldr of folders) {
		indexLines.push(`export * from './${path.basename(fldr)}'`)
		makeIndex(fldr)
	}

	fs.writeFileSync(folder + "/index.ts", indexLines.join("\n"))
}

makeIndex("src")
