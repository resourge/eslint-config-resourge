/**
 * @file Utils about filename
 * @author Huan Luo
 */

const { join, posix, sep } = require('path');

/**
 * Callback for file path
 *
 * @callback callback
 * @param {unknown} p
 */
/**
 * @returns {callback} piped function
 * @param {callback[]} fns callback functions
 */
const pipe =
	(...fns) =>
		(x) =>
			fns.reduce((v, f) => f(v), x);

/**
 * @example C:\
 */
const WINDOWS_DRIVE_LETTER_REGEXP = /^[A-Za-z]:\\/;

/**
 * Checks if the given argument is an object
 *
 * @param {any} x - The argument to check
 * @returns {boolean} - True if the argument is an object, false otherwise
 */
const isObject = (x) =>
	Object.prototype.toString.call(x) === '[object Object]';

/**
 * Checks if the given argument is an array
 *
 * @param {any} x - The argument to check
 * @returns {boolean} - True if the argument is an array, false otherwise
 */
const isArray = (x) =>
	x != null &&
	x.length >= 0 &&
	Object.prototype.toString.call(x) === '[object Array]';

/**
 * Checks if a value is an empty value
 *
 * @param {any} x - The value to check
 * @returns {boolean} - Returns true if the value is an empty value, false otherwise
 */
const isEmpty = (x) =>
	x === '' ||
	(isArray(x) && x.length === 0) ||
	(isObject(x) && Object.keys(x).length === 0);

/**
 * Negates a boolean value
 *
 * @param {boolean} x - The boolean value to negate
 * @returns {boolean} The negated boolean value
 */
const not = (x) => !x;

/**
 * Checks if a value isn't an empty value
 *
 * @param {any} x - The value to check
 * @returns {boolean} - Returns true if the value isn't an empty value, false otherwise
 */
const isNotEmpty = pipe(isEmpty, not);

/**
 * @returns {string} filename without path
 * @param {string} p filename concat with path in posix style
 */
const getFilename = (p) => posix.basename(p);

/**
 * @returns {string} path of folder
 * @param {string} p filename concat with path in posix style
 */
const getFolderPath = (p) => posix.join(posix.dirname(p), posix.sep);

/**
 * @returns {string} base name
 * @param {string} filename filename without path
 * @param {boolean} [ignoreMiddleExtensions=false] flag to ignore middle extensions
 */
const getBasename = (filename, ignoreMiddleExtensions = false) =>
	filename.substring(
		0,
		ignoreMiddleExtensions ? filename.indexOf('.') : filename.lastIndexOf('.')
	);

/**
 * @returns {string[]} all folders
 * @param {string} p path of folder in posix style
 */
const getAllFolders = (p) => p.split(posix.sep).filter(isNotEmpty);

/**
 * @example
 * returns ['src/', 'src/DisplayLabel/', 'src/DisplayLabel/__tests__/', 'DisplayLabel/__tests__]
 * getSubPaths('src/DisplayLabel/__tests__/');
 * @returns {string[]} subpaths
 * @param {string} p path of folder in posix style
 */
const getSubPaths = (p) => {
	const folders = getAllFolders(p);
	let subPaths = [];

	const walk = (array) =>
		array.reduce((acc, folder, index) => {
			const subpath = posix.join(acc, folder, posix.sep);

			if (index >= 1) subPaths.push(subpath);

			return subpath;
		}, '');

	for (let i = 0; i < folders.length; i++) {
		walk(folders.slice(i));
	}
	subPaths.unshift(posix.join(folders[0], posix.sep));

	return subPaths;
};

/**
 * @returns {string} path from repository root
 * @param {string} fullPath filename with full path
 * @param {string} repositoryRoot path of repository root
 */
const getPathFromRepositoryRoot = (fullPath, repositoryRoot) =>
	fullPath.replace(join(repositoryRoot, sep), '');

/**
 * @returns {string} file path in posix style
 * @param {string} p file path based on the operating system
 */
const toPosixPath = (p) => p.split(sep).join(posix.sep);

/**
 * @returns {string} file path without drive letter on windows
 * @param {string} p file path on windows
 */
const removeDriveLetter = (p) => p.replace(WINDOWS_DRIVE_LETTER_REGEXP, '');

/**
 * @returns {string} file path in posix style
 * @param {import('eslint').Rule.RuleContext} context rule eslint context
 */
const getFilePath = (context) => {
	const pathFromRoot = getPathFromRepositoryRoot(
		context.physicalFilename || context.getPhysicalFilename(),
		context.cwd || context.getCwd()
	);

	return pipe(removeDriveLetter, toPosixPath)(pathFromRoot);
};

module.exports = {
	WINDOWS_DRIVE_LETTER_REGEXP,
	isObject,
	isEmpty,
	isNotEmpty,
	pipe,
	getFilename,
	getFolderPath,
	getBasename,
	getAllFolders,
	getSubPaths,
	getFilePath
}