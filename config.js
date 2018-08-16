
import webapi from './webapi'

var _options = {
	webapi,
	webapiMap: {
		'portal.init':'/v1/sys/portal/init',
		'user.logout': '/v1/sys/user/logout'
	},
	websiteName: '某某系统',
	logo: 'logo.png',
	goAfterSignOut: {
		appName: 'mk-sys-sign-in',
		appParams: {}
	},
	menu: [{
		key: '1',
		name: '首页',
		appName: 'mk-sys-home',
		icon: 'home',
		fontFamily: 'awesome',
		isDefault: true
	}]
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config