import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, moudle } = getPackageJSON('react');
const pkgPath = resolvePkgPath(name);

const pkgDistPath = resolvePkgPath(name, true);

export default [
	//react
	{
		input: `${pkgPath}/${moudle}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFloder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	//jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				//jsx-runtime
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: `jsx-runtime.js`,
				format: 'umd'
			},
			{
				//jsx-dev-runtime
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: `jsx-dev-runtime.js`,
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
