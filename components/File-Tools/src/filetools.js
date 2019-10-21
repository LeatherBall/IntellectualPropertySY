FileIcon = (function () {

    var array = [
        'ape', 'au', 'avi', 'bat', 'bin', 'bmp', 'cab', 'chm', 'css', 'dll', 'doc', 'docx', 'eml', 'f4v', 'fla', 'flac', 'flv', 'gif', 'hlp', 'html',
        'ini', 'jpeg', 'jpg', 'mid', 'midi', 'mkv', 'mov', 'mp3', 'mp4', 'mpeg', 'mpg', 'pdf', 'png', 'ppt', 'pptx', 'psd', 'pst', 'rtf', 'swf', 'temp',
        'tif', 'tiff', 'txt', 'url', 'wav', 'wma', 'wmv', 'xls', 'xlsx'];

    return {
        /**
         * getTypeIcon
         * 获取文件类型图标文件路径
         * @param type  文件类型后缀
         */
        getTypeIcon: function (type) {
            for (var i = 0; i < array.length; i++) {
                if (type == array[i]) {
                    return 'adapter/File-Tools/images/' + type + '.png';
                }
            }
            return 'adapter/File-Tools/images/temp.png';
        }
    };

})();

FileView = (function () {

    return {

        mineTypes: {
            '.x3d': 'application/vnd.hzn-3d-crossword',
            '.3gp': 'video/3gpp',
            '.3g2': 'video/3gpp2',
            '.mseq': 'application/vnd.mseq',
            '.pwn': 'application/vnd.3m.post-it-notes',
            '.plb': 'application/vnd.3gpp.pic-bw-large',
            '.psb': 'application/vnd.3gpp.pic-bw-small',
            '.pvb': 'application/vnd.3gpp.pic-bw-var',
            '.tcap': 'application/vnd.3gpp2.tcap',
            '.7z': 'application/x-7z-compressed',
            '.abw': 'application/x-abiword',
            '.ace': 'application/x-ace-compressed',
            '.acc': 'application/vnd.americandynamics.acc',
            '.acu': 'application/vnd.acucobol',
            '.atc': 'application/vnd.acucorp',
            '.adp': 'audio/adpcm',
            '.aab': 'application/x-authorware-bin',
            '.aam': 'application/x-authorware-map',
            '.aas': 'application/x-authorware-seg',
            '.air': 'application/vnd.adobe.air-application-installer-package+zip',
            '.swf': 'application/x-shockwave-flash',
            '.fxp': 'application/vnd.adobe.fxp',
            '.pdf': 'application/pdf',
            '.ppd': 'application/vnd.cups-ppd',
            '.dir': 'application/x-director',
            '.xdp': 'application/vnd.adobe.xdp+xml',
            '.xfdf': 'application/vnd.adobe.xfdf',
            '.aac': 'audio/x-aac',
            '.ahead': 'application/vnd.ahead.space',
            '.azf': 'application/vnd.airzip.filesecure.azf',
            '.azs': 'application/vnd.airzip.filesecure.azs',
            '.azw': 'application/vnd.amazon.ebook',
            '.ami': 'application/vnd.amiga.ami',
            '.apk': 'application/vnd.android.package-archive',
            '.cii': 'application/vnd.anser-web-certificate-issue-initiation',
            '.fti': 'application/vnd.anser-web-funds-transfer-initiation',
            '.atx': 'application/vnd.antix.game-component',
            '.mpkg': 'application/vnd.apple.installer+xml',
            '.aw': 'application/applixware',
            '.les': 'application/vnd.hhe.lesson-player',
            '.swi': 'application/vnd.aristanetworks.swi',
            '.s': 'text/x-asm',
            '.atomcat': 'application/atomcat+xml',
            '.atomsvc': 'application/atomsvc+xml',
            '.atom': 'application/atom+xml',
            '.ac': 'application/pkix-attr-cert',
            '.aif': 'audio/x-aiff',
            '.avi': 'video/x-msvideo',
            '.aep': 'application/vnd.audiograph',
            '.dxf': 'image/vnd.dxf',
            '.dwf': 'model/vnd.dwf',
            '.bcpio': 'application/x-bcpio',
            '.bin': 'application/octet-stream',
            '.bmp': 'image/bmp',
            '.torrent': 'application/x-bittorrent',
            '.cod': 'application/vnd.rim.cod',
            '.mpm': 'application/vnd.blueice.multipass',
            '.bmi': 'application/vnd.bmi',
            '.sh': 'application/x-sh',
            '.btif': 'image/prs.btif',
            '.rep': 'application/vnd.businessobjects',
            '.bz': 'application/x-bzip',
            '.bz2': 'application/x-bzip2',
            '.csh': 'application/x-csh',
            '.c': 'text/x-c',
            '.cdxml': 'application/vnd.chemdraw+xml',
            '.css': 'text/css',
            '.cdx': 'chemical/x-cdx',
            '.cml': 'chemical/x-cml',
            '.csml': 'chemical/x-csml',
            '.cdbcmsg': 'application/vnd.contact.cmsg',
            '.cla': 'application/vnd.claymore',
            '.c4g': 'application/vnd.clonk.c4group',
            '.sub': 'image/vnd.dvb.subtitle',
            '.cdmia': 'application/cdmi-capability',
            '.cdmic': 'application/cdmi-container',
            '.cdmid': 'application/cdmi-domain',
            '.cdmio': 'application/cdmi-object',
            '.cdmiq': 'application/cdmi-queue',
            '.c11amc': 'application/vnd.cluetrust.cartomobile-config',
            '.c11amz': 'application/vnd.cluetrust.cartomobile-config-pkg',
            '.ras': 'image/x-cmu-raster',
            '.dae': 'model/vnd.collada+xml',
            '.csv': 'text/csv',
            '.cpt': 'application/mac-compactpro',
            '.wmlc': 'application/vnd.wap.wmlc',
            '.cgm': 'image/cgm',
            '.ice': 'x-conference/x-cooltalk',
            '.cmx': 'image/x-cmx',
            '.xar': 'application/vnd.xara',
            '.cmc': 'application/vnd.cosmocaller',
            '.cpio': 'application/x-cpio',
            '.clkx': 'application/vnd.crick.clicker',
            '.clkk': 'application/vnd.crick.clicker.keyboard',
            '.clkp': 'application/vnd.crick.clicker.palette',
            '.clkt': 'application/vnd.crick.clicker.template',
            '.clkw': 'application/vnd.crick.clicker.wordbank',
            '.wbs': 'application/vnd.criticaltools.wbs+xml',
            '.cryptonote': 'application/vnd.rig.cryptonote',
            '.cif': 'chemical/x-cif',
            '.cmdf': 'chemical/x-cmdf',
            '.cu': 'application/cu-seeme',
            '.cww': 'application/prs.cww',
            '.curl': 'text/vnd.curl',
            '.dcurl': 'text/vnd.curl.dcurl',
            '.mcurl': 'text/vnd.curl.mcurl',
            '.scurl': 'text/vnd.curl.scurl',
            '.car': 'application/vnd.curl.car',
            '.pcurl': 'application/vnd.curl.pcurl',
            '.cmp': 'application/vnd.yellowriver-custom-menu',
            '.dssc': 'application/dssc+der',
            '.xdssc': 'application/dssc+xml',
            '.deb': 'application/x-debian-package',
            '.uva': 'audio/vnd.dece.audio',
            '.uvi': 'image/vnd.dece.graphic',
            '.uvh': 'video/vnd.dece.hd',
            '.uvm': 'video/vnd.dece.mobile',
            '.uvu': 'video/vnd.uvvu.mp4',
            '.uvp': 'video/vnd.dece.pd',
            '.uvs': 'video/vnd.dece.sd',
            '.uvv': 'video/vnd.dece.video',
            '.dvi': 'application/x-dvi',
            '.seed': 'application/vnd.fdsn.seed',
            '.dtb': 'application/x-dtbook+xml',
            '.res': 'application/x-dtbresource+xml',
            '.ait': 'application/vnd.dvb.ait',
            '.svc': 'application/vnd.dvb.service',
            '.eol': 'audio/vnd.digital-winds',
            '.djvu': 'image/vnd.djvu',
            '.dtd': 'application/xml-dtd',
            '.mlp': 'application/vnd.dolby.mlp',
            '.wad': 'application/x-doom',
            '.dpg': 'application/vnd.dpgraph',
            '.dra': 'audio/vnd.dra',
            '.dfac': 'application/vnd.dreamfactory',
            '.dts': 'audio/vnd.dts',
            '.dtshd': 'audio/vnd.dts.hd',
            '.dwg': 'image/vnd.dwg',
            '.geo': 'application/vnd.dynageo',
            '.es': 'application/ecmascript',
            '.mag': 'application/vnd.ecowin.chart',
            '.mmr': 'image/vnd.fujixerox.edmics-mmr',
            '.rlc': 'image/vnd.fujixerox.edmics-rlc',
            '.exi': 'application/exi',
            '.mgz': 'application/vnd.proteus.magazine',
            '.epub': 'application/epub+zip',
            '.eml': 'message/rfc822',
            '.nml': 'application/vnd.enliven',
            '.xpr': 'application/vnd.is-xpr',
            '.xif': 'image/vnd.xiff',
            '.xfdl': 'application/vnd.xfdl',
            '.emma': 'application/emma+xml',
            '.ez2': 'application/vnd.ezpix-album',
            '.ez3': 'application/vnd.ezpix-package',
            '.fst': 'image/vnd.fst',
            '.fvt': 'video/vnd.fvt',
            '.fbs': 'image/vnd.fastbidsheet',
            '.fe_launch': 'application/vnd.denovo.fcselayout-link',
            '.f4v': 'video/x-f4v',
            '.flv': 'video/x-flv',
            '.fpx': 'image/vnd.fpx',
            '.npx': 'image/vnd.net-fpx',
            '.flx': 'text/vnd.fmi.flexstor',
            '.fli': 'video/x-fli',
            '.ftc': 'application/vnd.fluxtime.clip',
            '.fdf': 'application/vnd.fdf',
            '.f': 'text/x-fortran',
            '.mif': 'application/vnd.mif',
            '.fm': 'application/vnd.framemaker',
            '.fh': 'image/x-freehand',
            '.fsc': 'application/vnd.fsc.weblaunch',
            '.fnc': 'application/vnd.frogans.fnc',
            '.ltf': 'application/vnd.frogans.ltf',
            '.ddd': 'application/vnd.fujixerox.ddd',
            '.xdw': 'application/vnd.fujixerox.docuworks',
            '.xbd': 'application/vnd.fujixerox.docuworks.binder',
            '.oas': 'application/vnd.fujitsu.oasys',
            '.oa2': 'application/vnd.fujitsu.oasys2',
            '.oa3': 'application/vnd.fujitsu.oasys3',
            '.fg5': 'application/vnd.fujitsu.oasysgp',
            '.bh2': 'application/vnd.fujitsu.oasysprs',
            '.spl': 'application/x-futuresplash',
            '.fzs': 'application/vnd.fuzzysheet',
            '.g3': 'image/g3fax',
            '.gmx': 'application/vnd.gmx',
            '.gtw': 'model/vnd.gtw',
            '.txd': 'application/vnd.genomatix.tuxedo',
            '.ggb': 'application/vnd.geogebra.file',
            '.ggt': 'application/vnd.geogebra.tool',
            '.gdl': 'model/vnd.gdl',
            '.gex': 'application/vnd.geometry-explorer',
            '.gxt': 'application/vnd.geonext',
            '.g2w': 'application/vnd.geoplan',
            '.g3w': 'application/vnd.geospace',
            '.gsf': 'application/x-font-ghostscript',
            '.bdf': 'application/x-font-bdf',
            '.gtar': 'application/x-gtar',
            '.texinfo': 'application/x-texinfo',
            '.gnumeric': 'application/x-gnumeric',
            '.kml': 'application/vnd.google-earth.kml+xml',
            '.kmz': 'application/vnd.google-earth.kmz',
            '.gqf': 'application/vnd.grafeq',
            '.gif': 'image/gif',
            '.gv': 'text/vnd.graphviz',
            '.gac': 'application/vnd.groove-account',
            '.ghf': 'application/vnd.groove-help',
            '.gim': 'application/vnd.groove-identity-message',
            '.grv': 'application/vnd.groove-injector',
            '.gtm': 'application/vnd.groove-tool-message',
            '.tpl': 'application/vnd.groove-tool-template',
            '.vcg': 'application/vnd.groove-vcard',
            '.h261': 'video/h261',
            '.h263': 'video/h263',
            '.h264': 'video/h264',
            '.hpid': 'application/vnd.hp-hpid',
            '.hps': 'application/vnd.hp-hps',
            '.hdf': 'application/x-hdf',
            '.rip': 'audio/vnd.rip',
            '.hbci': 'application/vnd.hbci',
            '.jlt': 'application/vnd.hp-jlyt',
            '.pcl': 'application/vnd.hp-pcl',
            '.hpgl': 'application/vnd.hp-hpgl',
            '.hvs': 'application/vnd.yamaha.hv-script',
            '.hvd': 'application/vnd.yamaha.hv-dic',
            '.hvp': 'application/vnd.yamaha.hv-voice',
            '.sfd-hdstx': 'application/vnd.hydrostatix.sof-data',
            '.stk': 'application/hyperstudio',
            '.hal': 'application/vnd.hal+xml',
            '.html': 'text/html',
            '.irm': 'application/vnd.ibm.rights-management',
            '.sc': 'application/vnd.ibm.secure-container',
            '.ics': 'text/calendar',
            '.icc': 'application/vnd.iccprofile',
            '.ico': 'image/x-icon',
            '.igl': 'application/vnd.igloader',
            '.ief': 'image/ief',
            '.ivp': 'application/vnd.immervision-ivp',
            '.ivu': 'application/vnd.immervision-ivu',
            '.rif': 'application/reginfo+xml',
            '.3dml': 'text/vnd.in3d.3dml',
            '.spot': 'text/vnd.in3d.spot',
            '.igs': 'model/iges',
            '.i2g': 'application/vnd.intergeo',
            '.cdy': 'application/vnd.cinderella',
            '.xpw': 'application/vnd.intercon.formnet',
            '.fcs': 'application/vnd.isac.fcs',
            '.ipfix': 'application/ipfix',
            '.cer': 'application/pkix-cert',
            '.pki': 'application/pkixcmp',
            '.crl': 'application/pkix-crl',
            '.pkipath': 'application/pkix-pkipath',
            '.igm': 'application/vnd.insors.igm',
            '.rcprofile': 'application/vnd.ipunplugged.rcprofile',
            '.irp': 'application/vnd.irepository.package+xml',
            '.jad': 'text/vnd.sun.j2me.app-descriptor',
            '.jar': 'application/java-archive',
            '.class': 'application/java-vm',
            '.jnlp': 'application/x-java-jnlp-file',
            '.ser': 'application/java-serialized-object',
            '.java': 'text/x-java-source,java',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.joda': 'application/vnd.joost.joda-archive',
            '.jpm': 'video/jpm',
            // '.jpeg, .jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpg',
            '.jpgv': 'video/jpeg',
            '.ktz': 'application/vnd.kahootz',
            '.mmd': 'application/vnd.chipnuts.karaoke-mmd',
            '.karbon': 'application/vnd.kde.karbon',
            '.chrt': 'application/vnd.kde.kchart',
            '.kfo': 'application/vnd.kde.kformula',
            '.flw': 'application/vnd.kde.kivio',
            '.kon': 'application/vnd.kde.kontour',
            '.kpr': 'application/vnd.kde.kpresenter',
            '.ksp': 'application/vnd.kde.kspread',
            '.kwd': 'application/vnd.kde.kword',
            '.htke': 'application/vnd.kenameaapp',
            '.kia': 'application/vnd.kidspiration',
            '.kne': 'application/vnd.kinar',
            '.sse': 'application/vnd.kodak-descriptor',
            '.lasxml': 'application/vnd.las.las+xml',
            '.latex': 'application/x-latex',
            '.lbd': 'application/vnd.llamagraphics.life-balance.desktop',
            '.lbe': 'application/vnd.llamagraphics.life-balance.exchange+xml',
            '.jam': 'application/vnd.jam',
            '.apr': 'application/vnd.lotus-approach',
            '.pre': 'application/vnd.lotus-freelance',
            '.nsf': 'application/vnd.lotus-notes',
            '.org': 'application/vnd.lotus-organizer',
            '.scm': 'application/vnd.lotus-screencam',
            '.lwp': 'application/vnd.lotus-wordpro',
            '.lvp': 'audio/vnd.lucent.voice',
            '.m3u': 'audio/x-mpegurl',
            '.m4v': 'video/x-m4v',
            '.hqx': 'application/mac-binhex40',
            '.portpkg': 'application/vnd.macports.portpkg',
            '.mgp': 'application/vnd.osgeo.mapguide.package',
            '.mrc': 'application/marc',
            '.mrcx': 'application/marcxml+xml',
            '.mxf': 'application/mxf',
            '.nbp': 'application/vnd.wolfram.player',
            '.ma': 'application/mathematica',
            '.mathml': 'application/mathml+xml',
            '.mbox': 'application/mbox',
            '.mc1': 'application/vnd.medcalcdata',
            '.mscml': 'application/mediaservercontrol+xml',
            '.cdkey': 'application/vnd.mediastation.cdkey',
            '.mwf': 'application/vnd.mfer',
            '.mfm': 'application/vnd.mfmp',
            '.msh': 'model/mesh',
            '.mads': 'application/mads+xml',
            '.mets': 'application/mets+xml',
            '.mods': 'application/mods+xml',
            '.meta4': 'application/metalink4+xml',
            '.potm': 'application/vnd.ms-powerpoint.template.macroenabled.12',
            '.docm': 'application/vnd.ms-word.document.macroenabled.12',
            '.dotm': 'application/vnd.ms-word.template.macroenabled.12',
            '.mcd': 'application/vnd.mcd',
            '.flo': 'application/vnd.micrografx.flo',
            '.igx': 'application/vnd.micrografx.igx',
            '.es3': 'application/vnd.eszigno3+xml',
            '.mdb': 'application/x-msaccess',
            '.asf': 'video/x-ms-asf',
            '.exe': 'application/x-msdownload',
            '.cil': 'application/vnd.ms-artgalry',
            '.cab': 'application/vnd.ms-cab-compressed',
            '.ims': 'application/vnd.ms-ims',
            '.application': 'application/x-ms-application',
            '.clp': 'application/x-msclip',
            '.mdi': 'image/vnd.ms-modi',
            '.eot': 'application/vnd.ms-fontobject',
            '.xls': 'application/vnd.ms-excel',
            '.xlam': 'application/vnd.ms-excel.addin.macroenabled.12',
            '.xlsb': 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
            '.xltm': 'application/vnd.ms-excel.template.macroenabled.12',
            '.xlsm': 'application/vnd.ms-excel.sheet.macroenabled.12',
            '.chm': 'application/vnd.ms-htmlhelp',
            '.crd': 'application/x-mscardfile',
            '.lrm': 'application/vnd.ms-lrm',
            '.mvb': 'application/x-msmediaview',
            '.mny': 'application/x-msmoney',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
            '.ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            '.potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            '.obd': 'application/x-msbinder',
            '.thmx': 'application/vnd.ms-officetheme',
            '.onetoc': 'application/onenote',
            '.pya': 'audio/vnd.ms-playready.media.pya',
            '.pyv': 'video/vnd.ms-playready.media.pyv',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.ppam': 'application/vnd.ms-powerpoint.addin.macroenabled.12',
            '.sldm': 'application/vnd.ms-powerpoint.slide.macroenabled.12',
            '.pptm': 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
            '.ppsm': 'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
            '.mpp': 'application/vnd.ms-project',
            '.pub': 'application/x-mspublisher',
            '.scd': 'application/x-msschedule',
            '.xap': 'application/x-silverlight-app',
            '.stl': 'application/vnd.ms-pki.stl',
            '.cat': 'application/vnd.ms-pki.seccat',
            '.vsd': 'application/vnd.visio',
            '.wm': 'video/x-ms-wm',
            '.wma': 'audio/x-ms-wma',
            '.wax': 'audio/x-ms-wax',
            '.wmx': 'video/x-ms-wmx',
            '.wmd': 'application/x-ms-wmd',
            '.wpl': 'application/vnd.ms-wpl',
            '.wmz': 'application/x-ms-wmz',
            '.wmv': 'video/x-ms-wmv',
            '.wvx': 'video/x-ms-wvx',
            '.wmf': 'application/x-msmetafile',
            '.trm': 'application/x-msterminal',
            '.doc': 'application/msword',
            '.wri': 'application/x-mswrite',
            '.wps': 'application/vnd.ms-works',
            '.xbap': 'application/x-ms-xbap',
            '.xps': 'application/vnd.ms-xpsdocument',
            '.mid': 'audio/midi',
            '.mpy': 'application/vnd.ibm.minipay',
            '.afp': 'application/vnd.ibm.modcap',
            '.rms': 'application/vnd.jcp.javame.midlet-rms',
            '.tmo': 'application/vnd.tmobile-livetv',
            '.prc': 'application/x-mobipocket-ebook',
            '.mbk': 'application/vnd.mobius.mbk',
            '.dis': 'application/vnd.mobius.dis',
            '.plc': 'application/vnd.mobius.plc',
            '.mqy': 'application/vnd.mobius.mqy',
            '.msl': 'application/vnd.mobius.msl',
            '.txf': 'application/vnd.mobius.txf',
            '.daf': 'application/vnd.mobius.daf',
            '.fly': 'text/vnd.fly',
            '.mpc': 'application/vnd.mophun.certificate',
            '.mpn': 'application/vnd.mophun.application',
            '.mj2': 'video/mj2',
            '.mpga': 'audio/mpeg',
            '.mxu': 'video/vnd.mpegurl',
            '.mpeg': 'video/mpeg',
            '.m21': 'application/mp21',
            '.mp4a': 'audio/mp4',
            '.mp4': 'video/mp4',
            '.mp4': 'application/mp4',
            '.m3u8': 'application/vnd.apple.mpegurl',
            '.mus': 'application/vnd.musician',
            '.msty': 'application/vnd.muvee.style',
            '.mxml': 'application/xv+xml',
            '.ngdat': 'application/vnd.nokia.n-gage.data',
            '.n-gage': 'application/vnd.nokia.n-gage.symbian.install',
            '.ncx': 'application/x-dtbncx+xml',
            '.nc': 'application/x-netcdf',
            '.nlu': 'application/vnd.neurolanguage.nlu',
            '.dna': 'application/vnd.dna',
            '.nnd': 'application/vnd.noblenet-directory',
            '.nns': 'application/vnd.noblenet-sealer',
            '.nnw': 'application/vnd.noblenet-web',
            '.rpst': 'application/vnd.nokia.radio-preset',
            '.rpss': 'application/vnd.nokia.radio-presets',
            '.n3': 'text/n3',
            '.edm': 'application/vnd.novadigm.edm',
            '.edx': 'application/vnd.novadigm.edx',
            '.ext': 'application/vnd.novadigm.ext',
            '.gph': 'application/vnd.flographit',
            '.ecelp4800': 'audio/vnd.nuera.ecelp4800',
            '.ecelp7470': 'audio/vnd.nuera.ecelp7470',
            '.ecelp9600': 'audio/vnd.nuera.ecelp9600',
            '.oda': 'application/oda',
            '.ogx': 'application/ogg',
            '.oga': 'audio/ogg',
            '.ogv': 'video/ogg',
            '.dd2': 'application/vnd.oma.dd2+xml',
            '.oth': 'application/vnd.oasis.opendocument.text-web',
            '.opf': 'application/oebps-package+xml',
            '.qbo': 'application/vnd.intu.qbo',
            '.oxt': 'application/vnd.openofficeorg.extension',
            '.osf': 'application/vnd.yamaha.openscoreformat',
            '.weba': 'audio/webm',
            '.webm': 'video/webm',
            '.odc': 'application/vnd.oasis.opendocument.chart',
            '.otc': 'application/vnd.oasis.opendocument.chart-template',
            '.odb': 'application/vnd.oasis.opendocument.database',
            '.odf': 'application/vnd.oasis.opendocument.formula',
            '.odft': 'application/vnd.oasis.opendocument.formula-template',
            '.odg': 'application/vnd.oasis.opendocument.graphics',
            '.otg': 'application/vnd.oasis.opendocument.graphics-template',
            '.odi': 'application/vnd.oasis.opendocument.image',
            '.oti': 'application/vnd.oasis.opendocument.image-template',
            '.odp': 'application/vnd.oasis.opendocument.presentation',
            '.otp': 'application/vnd.oasis.opendocument.presentation-template',
            '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
            '.ots': 'application/vnd.oasis.opendocument.spreadsheet-template',
            '.odt': 'application/vnd.oasis.opendocument.text',
            '.odm': 'application/vnd.oasis.opendocument.text-master',
            '.ott': 'application/vnd.oasis.opendocument.text-template',
            '.ktx': 'image/ktx',
            '.sxc': 'application/vnd.sun.xml.calc',
            '.stc': 'application/vnd.sun.xml.calc.template',
            '.sxd': 'application/vnd.sun.xml.draw',
            '.std': 'application/vnd.sun.xml.draw.template',
            '.sxi': 'application/vnd.sun.xml.impress',
            '.sti': 'application/vnd.sun.xml.impress.template',
            '.sxm': 'application/vnd.sun.xml.math',
            '.sxw': 'application/vnd.sun.xml.writer',
            '.sxg': 'application/vnd.sun.xml.writer.global',
            '.stw': 'application/vnd.sun.xml.writer.template',
            '.otf': 'application/x-font-otf',
            '.osfpvg': 'application/vnd.yamaha.openscoreformat.osfpvg+xml',
            '.dp': 'application/vnd.osgi.dp',
            '.pdb': 'application/vnd.palm',
            '.p': 'text/x-pascal',
            '.paw': 'application/vnd.pawaafile',
            '.pclxl': 'application/vnd.hp-pclxl',
            '.efif': 'application/vnd.picsel',
            '.pcx': 'image/x-pcx',
            '.psd': 'image/vnd.adobe.photoshop',
            '.prf': 'application/pics-rules',
            '.pic': 'image/x-pict',
            '.chat': 'application/x-chat',
            '.p10': 'application/pkcs10',
            '.p12': 'application/x-pkcs12',
            '.p7m': 'application/pkcs7-mime',
            '.p7s': 'application/pkcs7-signature',
            '.p7r': 'application/x-pkcs7-certreqresp',
            '.p7b': 'application/x-pkcs7-certificates',
            '.p8': 'application/pkcs8',
            '.plf': 'application/vnd.pocketlearn',
            '.pnm': 'image/x-portable-anymap',
            '.pbm': 'image/x-portable-bitmap',
            '.pcf': 'application/x-font-pcf',
            '.pfr': 'application/font-tdpfr',
            '.pgn': 'application/x-chess-pgn',
            '.pgm': 'image/x-portable-graymap',
            '.png': 'image/png',
            '.ppm': 'image/x-portable-pixmap',
            '.pskcxml': 'application/pskc+xml',
            '.pml': 'application/vnd.ctc-posml',
            '.ai': 'application/postscript',
            '.pfa': 'application/x-font-type1',
            '.pbd': 'application/vnd.powerbuilder6',
            '.pgp': 'application/pgp-signature',
            '.box': 'application/vnd.previewsystems.box',
            '.ptid': 'application/vnd.pvi.ptid1',
            '.pls': 'application/pls+xml',
            '.str': 'application/vnd.pg.format',
            '.ei6': 'application/vnd.pg.osasli',
            '.dsc': 'text/prs.lines.tag',
            '.psf': 'application/x-font-linux-psf',
            '.qps': 'application/vnd.publishare-delta-tree',
            '.wg': 'application/vnd.pmi.widget',
            '.qxd': 'application/vnd.quark.quarkxpress',
            '.esf': 'application/vnd.epson.esf',
            '.msf': 'application/vnd.epson.msf',
            '.ssf': 'application/vnd.epson.ssf',
            '.qam': 'application/vnd.epson.quickanime',
            '.qfx': 'application/vnd.intu.qfx',
            '.qt': 'video/quicktime',
            '.rar': 'application/x-rar-compressed',
            '.ram': 'audio/x-pn-realaudio',
            '.rmp': 'audio/x-pn-realaudio-plugin',
            '.rsd': 'application/rsd+xml',
            '.rm': 'application/vnd.rn-realmedia',
            '.bed': 'application/vnd.realvnc.bed',
            '.mxl': 'application/vnd.recordare.musicxml',
            '.musicxml': 'application/vnd.recordare.musicxml+xml',
            '.rnc': 'application/relax-ng-compact-syntax',
            '.rdz': 'application/vnd.data-vision.rdz',
            '.rdf': 'application/rdf+xml',
            '.rp9': 'application/vnd.cloanto.rp9',
            '.jisp': 'application/vnd.jisp',
            '.rtf': 'application/rtf',
            '.rtx': 'text/richtext',
            '.link66': 'application/vnd.route66.link66+xml',
            '.rss': 'application/rss+xml',
            '.shf': 'application/shf+xml',
            '.st': 'application/vnd.sailingtracker.track',
            '.svg': 'image/svg+xml',
            '.sus': 'application/vnd.sus-calendar',
            '.sru': 'application/sru+xml',
            '.setpay': 'application/set-payment-initiation',
            '.setreg': 'application/set-registration-initiation',
            '.sema': 'application/vnd.sema',
            '.semd': 'application/vnd.semd',
            '.semf': 'application/vnd.semf',
            '.see': 'application/vnd.seemail',
            '.snf': 'application/x-font-snf',
            '.spq': 'application/scvp-vp-request',
            '.spp': 'application/scvp-vp-response',
            '.scq': 'application/scvp-cv-request',
            '.scs': 'application/scvp-cv-response',
            '.sdp': 'application/sdp',
            '.etx': 'text/x-setext',
            '.movie': 'video/x-sgi-movie',
            '.ifm': 'application/vnd.shana.informed.formdata',
            '.itp': 'application/vnd.shana.informed.formtemplate',
            '.iif': 'application/vnd.shana.informed.interchange',
            '.ipk': 'application/vnd.shana.informed.package',
            '.tfi': 'application/thraud+xml',
            '.shar': 'application/x-shar',
            '.rgb': 'image/x-rgb',
            '.slt': 'application/vnd.epson.salt',
            '.aso': 'application/vnd.accpac.simply.aso',
            '.imp': 'application/vnd.accpac.simply.imp',
            '.twd': 'application/vnd.simtech-mindmapper',
            '.csp': 'application/vnd.commonspace',
            '.saf': 'application/vnd.yamaha.smaf-audio',
            '.mmf': 'application/vnd.smaf',
            '.spf': 'application/vnd.yamaha.smaf-phrase',
            '.teacher': 'application/vnd.smart.teacher',
            '.svd': 'application/vnd.svd',
            '.rq': 'application/sparql-query',
            '.srx': 'application/sparql-results+xml',
            '.gram': 'application/srgs',
            '.grxml': 'application/srgs+xml',
            '.ssml': 'application/ssml+xml',
            '.skp': 'application/vnd.koan',
            '.sgml': 'text/sgml',
            '.sdc': 'application/vnd.stardivision.calc',
            '.sda': 'application/vnd.stardivision.draw',
            '.sdd': 'application/vnd.stardivision.impress',
            '.smf': 'application/vnd.stardivision.math',
            '.sdw': 'application/vnd.stardivision.writer',
            '.sgl': 'application/vnd.stardivision.writer-global',
            '.sm': 'application/vnd.stepmania.stepchart',
            '.sit': 'application/x-stuffit',
            '.sitx': 'application/x-stuffitx',
            '.sdkm': 'application/vnd.solent.sdkm+xml',
            '.xo': 'application/vnd.olpc-sugar',
            '.au': 'audio/basic',
            '.wqd': 'application/vnd.wqd',
            '.sis': 'application/vnd.symbian.install',
            '.smi': 'application/smil+xml',
            '.xsm': 'application/vnd.syncml+xml',
            '.bdm': 'application/vnd.syncml.dm+wbxml',
            '.xdm': 'application/vnd.syncml.dm+xml',
            '.sv4cpio': 'application/x-sv4cpio',
            '.sv4crc': 'application/x-sv4crc',
            '.sbml': 'application/sbml+xml',
            '.tsv': 'text/tab-separated-values',
            '.tiff': 'image/tiff',
            '.tao': 'application/vnd.tao.intent-module-archive',
            '.tar': 'application/x-tar',
            '.tcl': 'application/x-tcl',
            '.tex': 'application/x-tex',
            '.tfm': 'application/x-tex-tfm',
            '.tei': 'application/tei+xml',
            '.txt': 'text/plain',
            '.dxp': 'application/vnd.spotfire.dxp',
            '.sfs': 'application/vnd.spotfire.sfs',
            '.tsd': 'application/timestamped-data',
            '.tpt': 'application/vnd.trid.tpt',
            '.mxs': 'application/vnd.triscape.mxs',
            '.t': 'text/troff',
            '.tra': 'application/vnd.trueapp',
            '.ttf': 'application/x-font-ttf',
            '.ttl': 'text/turtle',
            '.umj': 'application/vnd.umajin',
            '.uoml': 'application/vnd.uoml+xml',
            '.unityweb': 'application/vnd.unity',
            '.ufd': 'application/vnd.ufdl',
            '.uri': 'text/uri-list',
            '.utz': 'application/vnd.uiq.theme',
            '.ustar': 'application/x-ustar',
            '.uu': 'text/x-uuencode',
            '.vcs': 'text/x-vcalendar',
            '.vcf': 'text/x-vcard',
            '.vcd': 'application/x-cdlink',
            '.vsf': 'application/vnd.vsf',
            '.wrl': 'model/vrml',
            '.vcx': 'application/vnd.vcx',
            '.mts': 'model/vnd.mts',
            '.vtu': 'model/vnd.vtu',
            '.vis': 'application/vnd.visionary',
            '.viv': 'video/vnd.vivo',
            '.ccxml': 'application/ccxml+xml,',
            '.vxml': 'application/voicexml+xml',
            '.src': 'application/x-wais-source',
            '.wbxml': 'application/vnd.wap.wbxml',
            '.wbmp': 'image/vnd.wap.wbmp',
            '.wav': 'audio/x-wav',
            '.davmount': 'application/davmount+xml',
            '.woff': 'application/x-font-woff',
            '.wspolicy': 'application/wspolicy+xml',
            '.webp': 'image/webp',
            '.wtb': 'application/vnd.webturbo',
            '.wgt': 'application/widget',
            '.hlp': 'application/winhlp',
            '.wml': 'text/vnd.wap.wml',
            '.wmls': 'text/vnd.wap.wmlscript',
            '.wmlsc': 'application/vnd.wap.wmlscriptc',
            '.wpd': 'application/vnd.wordperfect',
            '.stf': 'application/vnd.wt.stf',
            '.wsdl': 'application/wsdl+xml',
            '.xbm': 'image/x-xbitmap',
            '.xpm': 'image/x-xpixmap',
            '.xwd': 'image/x-xwindowdump',
            '.der': 'application/x-x509-ca-cert',
            '.fig': 'application/x-xfig',
            '.xhtml': 'application/xhtml+xml',
            '.xml': 'application/xml',
            '.xdf': 'application/xcap-diff+xml',
            '.xenc': 'application/xenc+xml',
            '.xer': 'application/patch-ops-error+xml',
            '.rl': 'application/resource-lists+xml',
            '.rs': 'application/rls-services+xml',
            '.rld': 'application/resource-lists-diff+xml',
            '.xslt': 'application/xslt+xml',
            '.xop': 'application/xop+xml',
            '.xpi': 'application/x-xpinstall',
            '.xspf': 'application/xspf+xml',
            '.xul': 'application/vnd.mozilla.xul+xml',
            '.xyz': 'chemical/x-xyz',
            '.yang': 'application/yang',
            '.yin': 'application/yin+xml',
            '.zir': 'application/vnd.zul',
            '.zip': 'application/zip',
            '.zmm': 'application/vnd.handheld-entertainment+xml',
            '.zaz': 'application/vnd.zzazz.deck+xml'
        },

        /**
         * optionFile
         * 打开文件方法
         * @param obj           文件对象
         * @param preview       是否支持预览
         * @param download      是否支持下载
         * @param viewPictures  图片查看回调方法
         */
        optionFile: function (obj, preview, download, viewPictures) {
            FileBase.log("OptionFile Object: " + JSON.stringify(obj));
            /** 图片类 **/
            if (obj.preview == 'picture') {
                viewPictures();
            }
            /** Office 文档类 **/
            else if (obj.preview == 'office') {
                if (preview && download) {
                    window.plugins.actionsheet.show({
                        androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
                        title: '请选择查看方式',
                        buttonLabels: ['在线预览', '普通下载'],
                        androidEnableCancelButton: true,
                        addCancelButtonWithLabel: '取消'
                    }, function (index) {
                        switch (index) {
                            /** 在线预览 **/
                            case 1 :
                                FileView.openPreview(obj);
                                break;
                            /** 下载到本地 **/
                            case 2 :
                                //TODO 下载管理
                                break;
                            default :
                                break;
                        }
                    }, function (error) {
                        FileBase.log("OptionFile Sheet Error: " + JSON.stringify(error));
                        window.plugins.toast.showShortBottom("打开文件出现错误");
                    });
                } else if (preview) {
                    FileView.openPreview(obj);
                } else if (download) {
                    //TODO 下载管理
                }
            }
            /** 其他 **/
            else if (obj.preview == 'nothing' && download) {
                //TODO 下载管理
            }
        },

        /**
         * openPriview
         * 在线预览接口
         * @param obj   文件对象
         */
        openPreview: function (obj) {
            if (window.plugins && window.plugins.spinnerDialog)
                window.plugins.spinnerDialog.show("ERM提示", "正在努力加载中请稍后...");
            HttpUtil.Ajax({
                AjaxDomain: true,
                isNoIntercept: false,
                hideload: true,
                url: context.serviceRealPath + 'mobile/util/getOnlinePreviewUrl.xhtml',
                data: {
                    fileId: obj.logicId,
                    fileSuffix: obj.fileType.substring(1)
                },
                success: function (result) {
                    FileBase.log("OpenPreview Ajax Success: " + JSON.stringify(result));
                    if (result.url) {
                        /** 内嵌浏览器打开路径 **/
                        var browers = window.open(result.url, '_blank', 'location=no');
                        /** 返回时关闭加载提示 **/
                        browers.addEventListener('exit', function () {
                            if (window.plugins && window.plugins.spinnerDialog)
                                window.plugins.spinnerDialog.hide();
                        });
                    } else {
                        if (window.plugins && window.plugins.spinnerDialog)
                            window.plugins.spinnerDialog.hide();
                        window.plugins.toast.showShortBottom("打开文件出现错误");
                    }
                },
                error: function (error) {
                    FileBase.log("OpenPreview Ajax Error: " + JSON.stringify(error));
                    if (window.plugins && window.plugins.spinnerDialog)
                        window.plugins.spinnerDialog.hide();
                    window.plugins.toast.showShortBottom("打开文件出现错误");
                }
            });
        },

        openFile: function (config) {
            var options = $.extend({
                system: topSystemFlag ? cordova.file.dataDirectory : '',
                directory: 'Temp',
                path: '',
                type: '',
                name: ''
            }, config);
            if (!options.path) {
                Tool.showWindowTip('未知文件路径', 'bottom');
                return;
            }
            if (!options.name)
                options.name = options.path.slice(options.path.lastIndexOf('/') + 1);
            if (!options.name) {
                Tool.showWindowTip('未知文件名称', 'bottom');
                return;
            }
            if (!options.type)
                options.type = options.path.slice(options.path.lastIndexOf('.'));
            if (!FileView.mineTypes[options.type]) {
                Tool.showWindowTip('未知文件类型', 'bottom');
                return;
            }
            if (topSystemFlag) {
                HttpUtil.ShowSingleCover('正在下载');
                window.resolveLocalFileSystemURL(options.system, function (dirEntry) {
                    dirEntry.getDirectory(options.directory, {
                        create: true,
                        exclusive: false
                    }, function (childEntry) {
                        var fileTransfer = new FileTransfer();
                        /** 下载应用文件 **/
                        fileTransfer.download(encodeURI(options.path), childEntry.nativeURL + options.name, function (fileEntry) {
                            HttpUtil.CloseSingleCover();
                            cordova.plugins.fileOpener2.open(
                                fileEntry.nativeURL,
                                FileView.mineTypes[options.type],
                                {
                                    error: function (e) {
                                        var $tip = $(
                                            '<div class="simple-tip">' +
                                            '   <p class="title">下载成功</p>' +
                                            '   <p class="intro">文件已保存至：<br>' + childEntry.nativeURL.substring(childEntry.nativeURL.indexOf(0) + 1) + obj.path.slice(obj.path.lastIndexOf('/') + 1) + '</p>' +
                                            '   <div class="common-button margin-t1" opt="sure">确定</div>' +
                                            '</div>');
                                        var $window = DialogUtil.getBaseDialog({
                                            title: '系统提示'
                                        });
                                        DialogUtil.openDialog1($window, $tip);
                                        $tip.find('[opt=sure]')[0].addEventListener('click', function (e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            $window.remove();
                                        });
                                        Tool.showWindowTip('没有可以打开该文件的应用', 'bottom');
                                    }
                                }
                            );
                        }, function (error) {
                            HttpUtil.CloseSingleCover();
                            Tool.showWindowTip('下载失败，请稍后重试', 'bottom');
                        });
                    }, function (e) {
                        HttpUtil.CloseSingleCover();
                        Tool.showWindowTip('获取文件系统失败', 'bottom');
                    });
                });
            } else {
                HttpUtil.CloseSingleCover();
                window.location.href = options.path;
            }
        }
    };

})();

FileBase = (function () {

    var unitArray = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return {
        /** 日志输出级别 **/
        DEBUG: 1,

        /**
         * checkImage
         * 获取文件类型是否为图片
         * @param type  文件类型后缀
         */
        checkImage: function (type) {
            var flag = false;
            type = type.toLowerCase();
            switch (type) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                case 'bmp':
                    flag = true;
                    break;
                default:
                    break;
            }
            return flag;
        },

        /**
         * formatSize
         * 格式化文件大小
         * @param value 文件字节数
         */
        formatSize: function (value) {
            if ($.trim(value) == '')
                return "0 Bytes";
            var index = 0, srcsize = parseFloat(value);
            var size = FileBase.roundFun(srcsize / Math.pow(1024, (index = Math.floor(Math.log(srcsize) / Math.log(1024)))), 2);
            return size + ' ' + unitArray[index];
        },

        roundFun: function (numberRound, roundDigit) {
            var number = parseInt((Math.abs(numberRound) * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit)
            return numberRound < 0 ? -number : number;
        },

        /**
         * getDefault
         * 获取默认图片路径
         */
        getDefault: function () {
            return 'resources/images/default.jpg';
        },

        /**
         * getDefaultUser
         * 获取默认头像图片路径
         */
        getDefaultUser: function () {
            return 'resources/images/xy1.png';
        },

        /**
         * lazyLoad
         * 图片懒加载
         * @param element   父容器元素
         */
        lazyLoad: function (element, flag) {
            if (element && element.length > 0) {
                var timer;
                /** 加载已存在图片 **/
                if (element.find('img[opt=wait]').length > 0)
                    loadImage(element, flag);
                /** 绑定容器滚动加载图片事件 **/
                element[0].addEventListener('scroll', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    loadImage(element, flag);
                });
                /** 绑定容器新插入元素加载图片事件 **/
                element.bind('DOMNodeInserted', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    clearTimeout(timer);
                    /** 循环插入，插入结束后调用 **/
                    timer = setTimeout(function (element) {
                        return function () {
                            element.unbind('DOMNodeInserted');
                            loadImage(element, flag);
                        }
                    }(element), 50);
                });
                /** 绑定图片加载完成影响页面布局加载图片事件 **/
                element.on('lazy', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    loadImage(element, flag);
                });

                /**
                 * loadImage
                 * 加载图片方法
                 * @param parent    父容器元素
                 */
                function loadImage(parent, flag) {
                    var height = parent.height(), top = parent.offset().top;
                    /** 获取未加载图片列表 **/
                    parent.find('img[opt=wait]').each(function () {
                        var image = $(this);
                        /** 判断图片是否进入可视区域 **/
                        if ((image.offset().top - top) <= height) {
                            /** 延时加载图片 **/
                            setTimeout(function (image) {
                                return function () {
                                    if (image.attr('opt') == 'wait') {
                                        image.removeAttr('opt');
                                        if (topSystemFlag) {
                                            if (flag && !context.LoadImage && navigator.connection.type != 'wifi')
                                                loadByUser(image);
                                            else
                                                image.attr('src', image.data('url'));
                                        } else {
                                            if (flag && !context.LoadImage)
                                                loadByUser(image);
                                            else
                                                image.attr('src', image.data('url'));
                                        }
                                    }
                                }
                            }(image), 100);
                        }
                    });
                }

                function loadByUser(image) {
                    var $containerElement = $(
                        '<div class="ct-image-custom">' +
                        '   <div class="cover">' +
                        '       <a><i class="fa fa-refresh"></i>加载</a>' +
                        '   </div>' +
                        '</div>');
                    image.before($containerElement);
                    $containerElement.append(image);
                    $containerElement.append('<i class="clear-float"></i>');
                    $containerElement[0].addEventListener('click', function (element) {
                        return function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            if (element.find('.cover').length > 0) {
                                var $imageElement = $(this).find('img');
                                $imageElement.attr('src', $imageElement.data('url'));
                                element.find('.cover').remove();
                                if (element.prev().hasClass('cover'))
                                    element.prev().css({zIndex: 1});
                            } else {
                                var array = ['.common-store-one', '.column-info-one', '.mine-order-info-commodity', '.mine-order-one'];
                                for (var i = 0; i < array.length; i++) {
                                    if (element.closest(array[i]).length > 0) {
                                        element.closest(array[i]).trigger('click');
                                        break;
                                    }
                                }
                            }
                        }
                    }($containerElement));
                }
            }
        },

        errorLoad: function (element) {
            if (element && element.length > 0) {
                element.find('img').on('error', function () {
                    if ($(this).attr('lang') == 'head')
                        $(this).attr('src', FileBase.getDefaultUser());
                    else
                        $(this).attr('src', FileBase.getDefault());
                });
            }
        },

        errorLoadHead: function (element) {
            if (element && element.length > 0) {
                element.find('img').on('error', function () {
                    $(this).attr('src', FileBase.getDefaultUser());
                });
            }
        },

        clickView: function (element, value, type, message) {
            element[0].addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $viewElement = $('body').find('.ct-image-view');
                if ($viewElement.length == 0) {
                    $viewElement = $(
                        '<div class="ct-image-view">' +
                        '   <i class="fa fa-circle-o-notch fa-spin waiting"></i>' +
                        '   <div class="inner">' +
                        '       <img src="" />' +
                        '   </div>' +
                        '</div>');
                    $('body').append($viewElement);
                    $viewElement[0].addEventListener('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $viewElement.removeClass('open');
                    });
                }
                $viewElement.find('img').attr('src', element.attr('src'));
                $viewElement.find('img').on('load', function () {
                    if ($(this).height() < $viewElement.height())
                        $viewElement.find('.inner').addClass('middle');
                });
                $viewElement.addClass('open');
                JPUSH.MessageImage(value, type, message, function (result) {
                    $viewElement.find('img').attr('src', result.filePath);
                    $viewElement.find('img').on('load', function () {
                        if ($(this).height() < $viewElement.height())
                            $viewElement.find('.inner').addClass('middle');
                    });
                    $viewElement.find('.waiting').remove();
                    element.attr('src', result.filePath);
                }, function () {
                    $viewElement.find('.waiting').remove();
                    Tool.showWindowTip('获取原始图片失败', 'bottom');
                });
            });
        },
        /**
         * 图片加载时的过渡动画
         */
        loadTransition: function ($imgEl, onComplete) {
            if (!$imgEl || !$imgEl.length) return;
            $imgEl.addClass('ct-image-loading').after('<div class="ct-loading-wrapper"><i class="fa-li fa fa-spinner fa-spin"></i></div>');
            $imgEl[0].onload = function () {
                $imgEl.removeClass('ct-image-loading').next().remove();
                onComplete && onComplete($imgEl);
            }
        },

        /**
         * 根据日志级别输出日志
         * @param tip   日志内容
         * @constructor
         */
        log: function (tip) {
            if (FileBase.DEBUG == 1)
                console.log(tip);
            else if (FileBase.DEBUG == 2)
                alert(tip);
        }
    };

})();

FilePicture = (function () {
    //检查参数和网络转态
    function DownloadFile(URL, Folder_Name, File_Name) {
        if (!URL || !Folder_Name || !File_Name) return;

        download(URL, Folder_Name, File_Name);
    }

    //得到写权限和创建文件夹
    function download(URL, Folder_Name, File_Name) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.TEMPORARY, 5 * 1024, fileSystemSuccess, fileSystemFail);

        function fileSystemSuccess(fileSystem) {
            var download_link = encodeURI(URL),
                ext = download_link.substr(download_link.lastIndexOf('.') + 1);
            var directoryEntry = fileSystem.root; // to get root path of directory
            directoryEntry.getDirectory(Folder_Name, {
                create: true,
                exclusive: false
            }, onDirectorySuccess, onDirectoryFail);
            var rootdir = fileSystem.root;
            var fp = rootdir.fullPath;
            fp = fp + '/' + Folder_Name + '/' + File_Name + '.' + ext;

            // download function call
            // filetransfer(download_link, fp);
            filetransfer(download_link, File_Name + '.' + ext);
        }

        // Directory created successfuly
        function onDirectorySuccess(parent) {

        }

        //Error while creating directory
        function onDirectoryFail(error) {
            window.plugins.toast.showShortBottom('保存失败');
            console.log('Unable to create new directory: ' + error.code);
        }

        //Unable to access file system
        function fileSystemFail(evt) {
            window.plugins.toast.showShortBottom('保存失败');
            console.log(evt.target.error.code);
        }
    }

    //下载文件到创建文件夹
    function filetransfer(download_link, fp) {
        /*var fileTransfer = new FileTransfer();
        fileTransfer.download(download_link, fp,
            function (entry) {
                window.plugins.toast.showShortBottom('保存成功');
            },
            function (error) {
                window.plugins.toast.showShortBottom('保存失败');
                console.log('download error source ' + error.source);
            }
        );*/
        window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dirEntry) {
            dirEntry.getDirectory('updates', {
                create: true,
                exclusive: false
            }, function (childEntry) {
                var fileTransfer = new FileTransfer();
                /** 下载图片**/
                fileTransfer.download(download_link, childEntry.nativeURL + fp, function (fileEntry) {
                    window.plugins.toast.showShortBottom('保存成功');
                }, function (error) {
                    window.plugins.toast.showShortBottom('保存失败');
                    console.log('download error source ' + error.source);
                });
            }, function (e) {
                window.plugins.toast.showShortBottom('保存失败');
            });
        });
    }

    return {
        /**
         * 保存图片到本地
         */
        savePicture: function (url, folderName, fileName) {
            DownloadFile(url, folderName, fileName);
        }
    };

})();
