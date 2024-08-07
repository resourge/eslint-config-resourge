const docsUrl = require('../util/docsUrl.js');
const { getBasename, getFilePath, getFilename, getAllFolders } = require('../util/filename.js');
const report = require("../util/report.js");

const messages = {
	mustBePascalCase: 'Component file must be in pascal case',
	mustBeCamelCase: 'Component folder must be in camel case',
	noMatch: 'Folder name and file name don\'t match',
};

const CAMEL_CASE = /^[a-z0-9]+(?:[A-Z][a-z0-9]*)*$/;
const PASCAL_CASE = /^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)*$/

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
	meta: {
		type: 'layout',
		messages,
		docs: {
			description: 'Component file name and folder must match. Folder name must be camel case version of file name. File name must be a pascal case.',
			category: 'Layout & Formatting',
			recommended: false,
			url: docsUrl('folder-file-convention'),
		},
		fixable: null
	},

	create(context) {
		return {
			Program: (node) => {
				const filenameWithPath = getFilePath(context);
				const filename = getFilename(filenameWithPath);
				const basename = getBasename(filename);

				if (basename.length > 1) {
					if ((filenameWithPath.includes('.tsx') || filenameWithPath.includes('.jsx')) && !(filename.startsWith('use') || filename.startsWith('Use'))) {
						const folderPath = getAllFolders(filenameWithPath.replace(filename, '')).at(-1);

						if (folderPath !== 'src') {
							if (folderPath.toLowerCase() !== basename.toLowerCase()) {
								if (!filename.toLowerCase().includes(folderPath.toLowerCase())) {
									report(context, messages.noMatch, 'noMatch', {
										node
									});
								}
							}

							if (!PASCAL_CASE.test(basename)) {
								report(context, messages.mustBePascalCase, 'mustBePascalCase', {
									node
								});
							}

							if (!CAMEL_CASE.test(folderPath)) {
								report(context, messages.mustBeCamelCase, 'mustBeCamelCase', {
									node
								});
							}
						}
					}
				}
			},
		};
	},
};