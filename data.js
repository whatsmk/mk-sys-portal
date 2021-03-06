export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-sys-portal',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-sys-portal-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: "{{'mk-sys-portal-header-left mk-sys-portal-header-left-' + (data.isFoldMenu?'fold':'unfold') }}",
				children: [{
					name: 'logo',
					component: '::img',
					className: 'mk-sys-portal-header-left-logo',
					src: '{{$getConfig().logo}}'
				}, {
					name: 'siteName',
					component: '::h3',
					children: '{{$getConfig().websiteName}}',
					_visible: '{{!data.isFoldMenu}}',
				}]
			}, {
				name: 'center',
				component: 'Layout',
				className: "mk-sys-portal-header-center",
				children: [{
					name: 'foldMenu',
					component: 'Layout',
					className: "mk-sys-portal-header-center-foldMenu",
					_visible: false,
					children: [{
						name: 'foldMenu',
						component: 'Icon',
						type: `{{data.isFoldMenu ? 'menu-unfold' :'menu-fold'}}`,
						title: '收起菜单',
						showStyle: 'showy',
						style: { fontSize: 19 },
						onClick: '{{$foldMenu}}'
					}]
				}, {
					name: 'tabs',
					component: 'Layout',
					className: "mk-sys-portal-header-center-tabs",
					children: {
						name: 'tabs',
						component: 'Tabs',
						type: 'card',
						type: "editable-card",
						hideAdd: true,
						activeKey: '{{data.content && data.content.name}}',
						onChange: '{{$tabChange}}',
						onEdit: '{{$tabEdit}}',
						_visible: '{{ data.isTabsStyle && data.openTabs && data.openTabs.length > 0}}',
						children: [{
							name: 'tab1',
							component: 'Tabs.TabPane',
							key: '{{data.openTabs[_rowIndex].name}}',
							tab: '{{data.openTabs[_rowIndex].name}}',
							_power: 'for in data.openTabs'
						}]
					}
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: "mk-sys-portal-header-right",
				children: [{
					name: 'search',
					component: 'Popover',
					placement: 'bottomRight',
					children: {
						name: 'search',
						component: 'Layout',
						className: "mk-sys-portal-header-right-search",
						children: {
							name: 'icon',
							component: 'Icon',
							fontFamily: 'awesome',
							showStyle: 'blueSky',
							type: 'search'
						},
					},
					content: {
						name: 'search',
						component: 'Input.Search'
					}
				}, {
					name: 'notice',
					component: 'Popover',
					placement: 'bottomRight',
					autoAdjustOverflow: true,
					overlayStyle: { width: 300 },
					children: {
						name: 'notice',
						component: 'Layout',
						className: "mk-sys-portal-header-right-search",
						children: {
							name: 'badge',
							component: 'Badge',
							count: 5,
							offset: [0, 2],
							children: {
								name: 'icon',
								component: 'Icon',
								fontFamily: 'awesome',
								showStyle: 'blueSky',
								type: 'bullhorn'
							}
						},
					},
					content: {
						name: 'notice',
						component: 'AppLoader',
						appName: 'mk-sys-portal-notice'
					}
				}, {
					name: 'topMenu',
					component: 'Layout',
					className: "mk-sys-portal-header-right-topMenu",
					children: [{
						name: 'topMenu',
						component: 'Menu',
						className: "mk-sys-portal-header-right-topMenu",
						mode: 'horizontal',
						onClick: '{{$topMenuClick}}',
						selectedKeys: [],
						children: [{
							name: 'toggleTabs',
							component: 'Menu.Item',
							key: 'toggleTabs',
							_visible: false,
							children: [{
								name: 'icon',
								component: 'Icon',
								type: 'appstore-o'
							},
								"{{data.isTabsStyle ? '正常风格' : '多页签显示风格'}}"]
						}, {
							name: 'gitter',
							component: 'Menu.Item',
							key: 'gitter',
							_visible: false,
							children: [{
								name: 'icon',
								component: 'Icon',
								fontFamily: 'awesome',
								type: 'wechat'
							}, '聊天']
						}, {
							name: 'github',
							component: 'Menu.Item',
							key: 'github',
							_visible: false,
							children: [{
								name: 'icon',
								component: 'Icon',
								type: 'github'
							}, '源代码']
						}, {
							name: 'my',
							component: 'Menu.SubMenu',
							key: 'my',
							title: {
								name: 'myTitle',
								component: '::span',
								className: 'mk-sys-portal-header-right-my-title',
								children: [{
									name: 'photo',
									component: '::img',
									className: 'mk-sys-portal-header-right-photo',
									src: '{{$getPhoto()}}'
								}, "{{data.other.currentUser?data.other.currentUser.name:'13334445556'}}"]
							},
							children: [{
								name: 'mySetting',
								component: 'Menu.Item',
								key: 'mySetting',
								children: '个人设置'
							}, {
								name: 'logout',
								component: 'Menu.Item',
								key: 'logout',
								children: '注销'
							}]
						}]
					}]
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-sys-portal-content',
			children: [{
				name: 'left',
				component: 'Layout',
				className: "{{'mk-sys-portal-content-left mk-sys-portal-content-left-' + (data.isFoldMenu?'fold':'unfold') }}",
				style: "{{({overflow:data.isFoldMenu?'visible':'auto'})}}",
				children: [{
					name: 'menu',
					component: 'Menu',
					mode: 'vertical',
					theme: 'dark',
					className: 'mk-sys-portal-content-left-menu',
					//forceSubMenuRender:true,
					//subMenuCloseDelay: 0.06,
					//subMenuOpenDelay: 0.3,
					inlineCollapsed: '{{data.isFoldMenu}}',
					selectedKeys: "{{$getMenuSelectKeys()}}",
					defaultOpenKeys: "{{data.menuDefaultOpenKeys}}",
					onClick: '{{$menuClick}}',
					getPopupContainer: () => { return document.querySelector('.mk-sys-portal-content-left-menu') },
					children: '{{$getMenuChildren()}}'
				}, {
					name: 'foldMenu',
					component: 'Layout',
					className: 'mk-sys-portal-content-left-foldMenu',
					children: [{
						name: 'foldMenu',
						component: 'Icon',
						type: `{{data.isFoldMenu ? 'menu-unfold' :'menu-fold'}}`,
						title: `{{data.isFoldMenu ? '展开菜单' :'收起菜单'}}`,
						showStyle: 'showy',
						style: { fontSize: 19 },
						onClick: '{{$foldMenu}}'
					}]
				}]
			}, {
				name: 'container',
				component: 'Layout',
				children: [{
					name: 'tabs',
					component: 'Tabs',
					className: 'mk-sys-portal-content-tabs',
					type: 'card',
					type: "editable-card",
					hideAdd: true,
					activeKey: '{{data.content && data.content.name}}',
					onChange: '{{$tabChange}}',
					onEdit: '{{$tabEdit}}',
					_visible: '{{ data.isTabsStyle && data.openTabs && data.openTabs.length > 0}}',
					_visible: false,
					children: [{
						name: 'tab1',
						component: 'Tabs.TabPane',
						key: '{{data.openTabs[_rowIndex].name}}',
						tab: '{{data.openTabs[_rowIndex].name}}',
						_power: 'for in data.openTabs'
					}]
				}, {
					name: 'main',
					component: 'Layout',
					className: 'mk-sys-portal-content-main',
					_visible: '{{!!(data.content && data.content.appName)}}',
					children: {
						name: 'main',
						component: 'Layout',
						children: {
							name: 'app',
							component: 'AppLoader',
							appName: '{{ data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appName }}',
							onPortalReload: '{{$load}}',
							setPortalContent: '{{$setContent}}',
							'...': '{{data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appProps}}',
							isTabStyle: '{{data.isTabsStyle}}',
							_notRender: '{{ !(data.content && data.content.name == data.openTabs[_rowIndex].name) }}',
							_power: 'for in data.openTabs',

						}
					}

				}]
			}]
		}, {
			name: 'issue',
			component: 'Movable',
			_visible: false,
			onClick: '{{$issueClick}}',
			style: {
				bottom: 30,
				left: 8,
				width: 50,
				height: 50,
			},
			children: {
				name: 'btn',
				component: 'Button',
				type: 'showy',
				children: '填问题'
			}
		}]
	}
}

export function getInitState() {
	return {
		data: {
			menu: [],
			menuSelectedKeys: [],
			menuDefaultOpenKeys: [],
			content: {},
			openTabs: [],
			isTabsStyle: true,
			isFoldMenu: true,
			other: {}
		}
	}
}