(function () {
  "use strict";

  var viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
    requestRenderMode: true,
    animation: false,
    geocoder: false,
    homeButton: false,
    fullscreenButton: false,
    navigationHelpButton: false,
    timeline: false,
    infoBox: true,
    baseLayerPickerViewModel: true,
    // sceneModePicker: true,
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      url: 'https://cyberjapandata.gsi.go.jp/xyz/std/',
      credit: new Cesium.Credit('地理院タイル', '', 'https://maps.gsi.go.jp/development/ichiran.html')
    }),
    // terrainProvider: new Cesium.JapanGSITerrainProvider({
    //   heightPoint: 2.0,
    // }),
    terrainProvider: Cesium.createWorldTerrain(),
    baseLayerPicker: false,
  });





  // 初期シーンを2Dにする
  viewer.scene.mode = Cesium.SceneMode.SCENE2D;



  // みなとみらい
  viewer.camera.setView({
    // destination: Cesium.Cartesian3.fromDegrees(139.6340599, 35.4548003, 500),
    // orientation: {
    //   heading: 0, // 水平方向の回転度（ラジアン）
    //   pitch: -0.5, // 垂直方向の回転度（ラジアン） 上を見上げたり下を見下ろしたり
    //   roll: 0
    // }
    destination: Cesium.Cartesian3.fromDegrees(139.63151, 35.45896, 4000.0),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-100),
      roll: 0.0
    },
  });


  // メモ（付箋）ボタンクリックで複数ピン表示
  var pins_lat = [
    35.45896,
    35.46014,
    35.45824,
    35.45707,
    35.45920,
    35.46116,
    35.46276,
  ];
  var pins_lon = [
    139.63151,
    139.63370,
    139.63525,
    139.63309,
    139.62978,
    139.62982,
    139.62980,
  ];
  var pins_memo = [
    "2021/6/20 ガス配管点検済み　配管の交換が必要",
    "2021/7/20 ガス配管点検済み　配管の交換が必要",
    "2021/8/20 ガス配管点検済み　配管の交換が必要",
    "2021/9/20 ガス配管点検済み　配管の交換が必要",
    "2021/10/20 ガス配管点検済み　配管の交換が必要",
    "2021/11/20 ガス配管点検済み　配管の交換が必要",
    "2021/12/20 ガス配管点検済み　配管の交換が必要",
  ];


  var pinHeights = 40;
  // ボタンクリックでピン表示
  document.getElementById('memo-btn').addEventListener('click', function () {
    const pinBuilder = new Cesium.PinBuilder();

    for (let i = 0; pins_lon.length > i; i++) {
      viewer.entities.add({
        name: pins_memo[1],
        position: Cesium.Cartesian3.fromDegrees(pins_lon[i], pins_lat[i], pinHeights),
        billboard: {
          image: pinBuilder.fromText("memo", Cesium.Color.ROYALBLUE, 88),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
      });
    };
    viewer.camera.moveUp(0.1); 

  });

  // カメラ移動機能の座標取得
  let clickLength = 0;
  var lon_1 = 0;
  var lat_1 = 0;
  var lon_2 = 0;
  var lat_2 = 0;


  let lonX = 0;
  let latY = 0;
  let heightZ = 0;
  let heading = 0;
  let pitch = 0;
  let roll = 0;

  // 視点移動ボタン（上下左右）クリック時の座標取得
  var mapCenter = function getMapCenter() {
    var height = viewer.camera.position.z;

    var windowPosition = new Cesium.Cartesian3(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2, height);
    var pickRay = viewer.scene.camera.getPickRay(windowPosition);
    var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
    var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    console.log(pickPositionCartographic.longitude * (180 / Math.PI));
    console.log(pickPositionCartographic.latitude * (180 / Math.PI));
    console.log(pickPositionCartographic.height * (180 / Math.PI));

    var camPos = viewer.camera.positionCartographic;
    console.log(camPos.longitude * (180 / Math.PI));
    console.log(camPos.latitude * (180 / Math.PI));

    lonX = camPos.longitude * (180 / Math.PI);
    latY = camPos.latitude * (180 / Math.PI);
    heightZ = camPos.height;

    console.log(viewer.camera.position);
    console.log(heightZ);

    heading = viewer.camera.heading;
    pitch = viewer.camera.pitch;
    roll = viewer.camera.roll;



  };
  // カメラ位置を移動
  var camera_translate = function cameraTranslate() {
    viewer.camera.flyTo({
      duration: 0.5,
      destination: Cesium.Cartesian3.fromDegrees(lonX, latY, heightZ),
      // orientation: {
      //     heading: Cesium.Math.toRadians(0),
      //     pitch: Cesium.Math.toRadians(-100),
      //     roll: 0.0
      // },
      orientation: {
        heading: heading,
        pitch: pitch,
        roll: roll
      },
    });
  };


  // 上方向に移動
  document.getElementById('viewpoint-up').addEventListener('click', function () {

    mapCenter();
    heightZ = heightZ + 20;

    camera_translate();
    console.log(viewer.camera.heading);

  });
  // 下方向に移動
  document.getElementById('viewpoint-dawn').addEventListener('click', function () {

    mapCenter();
    heightZ = heightZ - 20;

    camera_translate();

  });
  // 緯度（横方向）をプラス移動
  document.getElementById('viewpoint-right').addEventListener('click', function () {

    mapCenter();
    lonX = lonX + 0.001;

    camera_translate();
  });
  // 緯度（横方向）をマイナス移動
  document.getElementById('viewpoint-left').addEventListener('click', function () {

    mapCenter();
    lonX = lonX - 0.001;

    camera_translate();

  });

  // 再計測ボタンでリセット
  document.getElementById('distance-btn').addEventListener('click', function () {
    viewer.entities.removeAll();
    viewer.camera.moveUp(2);
    clickLength = 0;
  });

  // キャンバスクリック時、オン状態なら二点計測
  viewer.canvas.addEventListener('click',
    function (e) {
      // 二点計測がオンなら
      if (distance_mode) {

        var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);

        if (cartesian) {
          //位置情報を管理するオブジェクトcartographicを取得 
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          // 緯度経度を小数点5桁で取得
          var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
          console.log("#######clickLength=", clickLength, "lon=", lon, "lat=", lat);
          // 一回目のクリック
          if (clickLength === 0) {
            // console.log("click1-carto",cartographic.longitude,cartographic.latitude);
            // 経度緯度 No1
            lon_1 = Number(lon);
            lat_1 = Number(lat);
            // console.log("*****clickLength=",clickLength,"lon_1=",lon_1,"lat_1=",lat_1);

            // 座標にピン表示
            const pinBuilder = new Cesium.PinBuilder();
            viewer.entities.add({
              name: '距離計測',
              position: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), pinHeights),
              billboard: {
                // image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 38).toDataURL(),
                image: pinBuilder.fromText("S", Cesium.Color.ROYALBLUE, 38),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              },
            });
          // 二回目のクリック
          } else if (clickLength === 1) {

            // 経度緯度 No2
            lon_2 = Number(lon);
            lat_2 = Number(lat);
            // 二点間距離計算
            var positions = Cesium.Cartesian3.fromDegreesArray([lon_1, lat_1, lon_2, lat_2]);

            var surfacePositions = Cesium.PolylinePipeline.generateArc({
              positions: positions
            });
            var scratchCartesian3 = new Cesium.Cartesian3();
            var surfacePositionsLength = surfacePositions.length;
            var totalDistanceInMeters = 0;
            for (var i = 3; i < surfacePositionsLength; i += 3) {
              scratchCartesian3.x = surfacePositions[i] - surfacePositions[i - 3];
              scratchCartesian3.y = surfacePositions[i + 1] - surfacePositions[i - 2];
              scratchCartesian3.z = surfacePositions[i + 2] - surfacePositions[i - 1];
              totalDistanceInMeters += Cesium.Cartesian3.magnitude(scratchCartesian3);
            };
            var totalDistanceInKm = totalDistanceInMeters * 0.001;

            // 二点間の直線
            viewer.entities.add({
              name: "二点計測線",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([lon_1, lat_1, pinHeights, lon_2, lat_2, pinHeights]),
                width: 3,
                material: Cesium.Color.BLUE,
                clampToGround: false,
              },
            });

            // 座標にピン表示
            const pinBuilder = new Cesium.PinBuilder();
            const pin = viewer.entities.add({
              name: '距離計測結果: ' + totalDistanceInKm.toFixed(3) + ' km',
              position: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), pinHeights),
              billboard: {
                // image: pinBuilder.fromColor(Cesium.Color.BLUE, 58).toDataURL(),
                image: pinBuilder.fromText("E", Cesium.Color.BLUE, 48),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              },
            });
          };
          clickLength++;
        }

        // viewer.camera.moveUp(0.1); 
      }
      viewer.camera.moveUp(0.1);
    }, false

  );
  if (distance_mode) {
    if (clickLength > 2) {
      window.body.addEventListener('contextmenu', function (e) {
        viewer.entities.removeAll();
        clickLength = -1;
      });
    }
  }

  // シーン2D3D切替時のボタン表示
  const scene_button_3d = document.getElementsByClassName('toolbar-btn-3d');
  const scene_button_2d = document.getElementsByClassName('toolbar-btn-2d');
  const scene_change_attribute = document.getElementById('attribute');
  const scene_change_oekakiPolygon = document.getElementById('kouji-polygon');
  const scene_change_oekakiCanvas = document.getElementById('oekaki-canvas');
  const scale_box = document.getElementById('scaleBox');
  const viewpoint_y = document.getElementById('viewpoint-y');
  const viewpoint_x = document.getElementById('viewpoint-x');


  // シーン取得初期表示ボタン
  if (viewer.scene.mode == Cesium.SceneMode.SCENE2D) {
    for (let i = 0; i < scene_button_3d.length; i++) {
      scene_button_3d[i].classList.add('toolbar-btn-off');
    }

    for (let i = 0; i < scene_button_2d.length; i++) {
      scene_button_2d[i].classList.remove('toolbar-btn-off');
    }
    scale_box.classList.add('scaleBox-active');
    viewpoint_y.classList.remove('active');
    viewpoint_x.classList.remove('active');
  } else {
    for (let i = 0; i < scene_button_2d.length; i++) {
      scene_button_2d[i].classList.add('toolbar-btn-off');
    }

    for (let i = 0; i < scene_button_3d.length; i++) {
      scene_button_3d[i].classList.remove('toolbar-btn-off');
    }
    viewpoint_y.classList.add('active');
    viewpoint_x.classList.add('active');
  }


  // シーン切替時のイベント取得・表示非表示
  viewer.scene.morphComplete.addEventListener(function () {

    // 画面が3Dの場合
    if (viewer.scene.mode == Cesium.SceneMode.SCENE3D) {
      scene_change_attribute.classList.remove('active');
      scene_change_oekakiPolygon.classList.remove('active');
      scene_change_oekakiCanvas.classList.remove('active');

      viewpoint_y.classList.add('active');
      viewpoint_x.classList.add('active');


      // 建物データ（プラトー）表示
      viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: './plateau_date/plateau_date/14100_yokohama-shi_2020_3Dtiles_etc_1_op/14100_yokohama-shi_2020_3Dtiles_etc_1_op/01_building/14100_yokohama-shi_2020_bldg_notexture/tileset.json',
      }));

      // 画面3D時のボタン切替
      for (let i = 0; i < scene_button_2d.length; i++) {
        scene_button_2d[i].classList.add('toolbar-btn-off');
      }
      for (let i = 0; i < scene_button_3d.length; i++) {
        scene_button_3d[i].classList.remove('toolbar-btn-off');
      }
      // みなとみらいを表示
      setTimeout(function () {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(139.63136, 35.45933, 3500.0),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0
          },
        });
      }
        , 100);
      // 縮尺非表示
      scale_box.classList.remove('scaleBox-active');

    } else {
      // 画面2Dのボタン切替
      for (let i = 0; i < scene_button_3d.length; i++) {
        scene_button_3d[i].classList.add('toolbar-btn-off');
      }
      for (let i = 0; i < scene_button_2d.length; i++) {
        scene_button_2d[i].classList.remove('toolbar-btn-off');
      }
      // 2Dは建物データを非表示
      viewer.scene.primitives.removeAll();
      console.log(kml_tsusin_Polygon);
      // カメラ視点移動ボタン非表示
      viewpoint_y.classList.remove('active');
      viewpoint_x.classList.remove('active');
      // みなとみらいを表示
      setTimeout(function () {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(139.6335, 35.4585, 10000.0),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-100),
            roll: 0.0
          },
        });
      }
        , 100);
      // 縮尺を表示
      scale_box.classList.add('scaleBox-active');



    }
  });
















  // KMLデータをロード
  // 通信
  var kml_tsusin_Polygon = new Cesium.KmlDataSource();
  var kml_tsusin_MH = new Cesium.KmlDataSource();
  var kml_tsusin_PL = new Cesium.KmlDataSource();
  // kml_tsusin_MH.load('http://172.16.52.128/Cesiumdemo1.101.0/3次元ダミーデータ/【3D占用デモ】通信MH.kml');
  // kml_tsusin_PL.load('http://172.16.52.128/Cesiumdemo1.101.0/3次元ダミーデータ/【3D占用デモ】通信管路.kml');
  kml_tsusin_Polygon.load('./KML_20221219_1045/申請範囲【3D占用デモ】_NTT東日本.kml');
  kml_tsusin_MH.load('./3次元ダミーデータ/【3D占用デモ】通信MH.kml');
  kml_tsusin_PL.load('./3次元ダミーデータ/【3D占用デモ】通信管路.kml');
  // 電力
  var kml_denryoku_Polygon = new Cesium.KmlDataSource();
  var kml_denryoku_MH = new Cesium.KmlDataSource();
  var kml_denryoku_PL = new Cesium.KmlDataSource();
  kml_denryoku_Polygon.load('./KML_20221219_1045/申請範囲【3D占用デモ】_東京電力.kml');
  kml_denryoku_MH.load('./3次元ダミーデータ/【3D占用デモ】電力MH.kml');
  kml_denryoku_PL.load('./3次元ダミーデータ/【3D占用デモ】電力管路.kml');
  // ガス
  var kml_gasu_Polygon = new Cesium.KmlDataSource();
  var kml_gasu_MH = new Cesium.KmlDataSource();
  var kml_gasu_PL = new Cesium.KmlDataSource();
  kml_gasu_Polygon.load('./KML_20221219_1045/申請範囲【3D占用デモ】_東京ガス.kml');
  kml_gasu_MH.load('./3次元ダミーデータ/【3D占用デモ】ガスMH.kml');
  kml_gasu_PL.load('./3次元ダミーデータ/【3D占用デモ】ガス管路.kml');
  // 上水道
  var kml_jousui_Polygon = new Cesium.KmlDataSource();
  var kml_jousui_MH = new Cesium.KmlDataSource();
  var kml_jousui_PL = new Cesium.KmlDataSource();
  kml_jousui_Polygon.load('./KML_20221219_1045/申請範囲【3D占用デモ】_横浜上水道.kml');
  kml_jousui_MH.load('./3次元ダミーデータ/【3D占用デモ】上水道MH.kml');
  kml_jousui_PL.load('./3次元ダミーデータ/【3D占用デモ】上水道管路.kml');
  // 下水道
  var kml_gesui_Polygon = new Cesium.KmlDataSource();
  var kml_gesui_MH = new Cesium.KmlDataSource();
  var kml_gesui_PL = new Cesium.KmlDataSource();
  kml_gesui_Polygon.load('./KML_20221219_1045/申請範囲【3D占用デモ】_横浜下水道.kml');
  kml_gesui_MH.load('./3次元ダミーデータ/【3D占用デモ】下水道MH.kml');
  kml_gesui_PL.load('./3次元ダミーデータ/【3D占用デモ】下水道管路.kml');

  // デフォルトで全表示
  viewer.dataSources.add(kml_tsusin_Polygon);
  viewer.dataSources.add(kml_tsusin_MH);
  viewer.dataSources.add(kml_tsusin_PL);
  viewer.dataSources.add(kml_denryoku_MH);
  viewer.dataSources.add(kml_denryoku_PL);
  viewer.dataSources.add(kml_denryoku_Polygon);
  viewer.dataSources.add(kml_gasu_MH);
  viewer.dataSources.add(kml_gasu_PL);
  viewer.dataSources.add(kml_gasu_Polygon);
  viewer.dataSources.add(kml_jousui_MH);
  viewer.dataSources.add(kml_jousui_PL);
  viewer.dataSources.add(kml_jousui_Polygon);
  viewer.dataSources.add(kml_gesui_MH);
  viewer.dataSources.add(kml_gesui_PL);
  viewer.dataSources.add(kml_gesui_Polygon);

  // チェックされたらポリゴンレイヤーを切替表示
  // 通信
  const polygon_change_1 = document.getElementById('facility-check1');
  polygon_change_1.addEventListener('change', () => {
    if (polygon_change_1.checked == false) {
      viewer.dataSources.remove(kml_tsusin_MH);
      viewer.dataSources.remove(kml_tsusin_PL);
    } else if (polygon_change_1.checked == true) {
      viewer.dataSources.add(kml_tsusin_MH);
      viewer.dataSources.add(kml_tsusin_PL);
    };
    viewer.camera.moveUp(0.001);
  });
  //電力
  const polygon_change_2 = document.getElementById('facility-check2');
  polygon_change_2.addEventListener('change', () => {
    if (polygon_change_2.checked == false) {
      viewer.dataSources.remove(kml_denryoku_MH);
      viewer.dataSources.remove(kml_denryoku_PL);
    } else if (polygon_change_2.checked == true) {
      viewer.dataSources.add(kml_denryoku_MH);
      viewer.dataSources.add(kml_denryoku_PL);
    };
    viewer.camera.moveUp(0.001);
  });
  // ガス
  const polygon_change_3 = document.getElementById('facility-check3');
  polygon_change_3.addEventListener('change', () => {
    if (polygon_change_3.checked == false) {
      viewer.dataSources.remove(kml_gasu_MH);
      viewer.dataSources.remove(kml_gasu_PL);
    } else if (polygon_change_3.checked == true) {
      viewer.dataSources.add(kml_gasu_MH);
      viewer.dataSources.add(kml_gasu_PL);
    };
    viewer.camera.moveUp(0.001);
  });
  // 上水道
  const polygon_change_4 = document.getElementById('facility-check4');
  polygon_change_4.addEventListener('change', () => {
    if (polygon_change_4.checked == false) {
      viewer.dataSources.remove(kml_jousui_MH);
      viewer.dataSources.remove(kml_jousui_PL);
    } else if (polygon_change_4.checked == true) {
      viewer.dataSources.add(kml_jousui_MH);
      viewer.dataSources.add(kml_jousui_PL);
    };
    viewer.camera.moveUp(0.001);
  });
  // 下水道
  const polygon_change_5 = document.getElementById('facility-check5');
  polygon_change_5.addEventListener('change', () => {
    if (polygon_change_5.checked == false) {
      viewer.dataSources.remove(kml_gesui_MH);
      viewer.dataSources.remove(kml_gesui_PL);
    } else if (polygon_change_5.checked == true) {
      viewer.dataSources.add(kml_gesui_MH);
      viewer.dataSources.add(kml_gesui_PL);
    };
    viewer.camera.moveUp(0.001);
  });

  // 工事計画ポリゴン切替
  // 通信工事
  const polygon_change_10 = document.getElementById('facility-check10');
  polygon_change_10.addEventListener('change', () => {
    if (polygon_change_10.checked == false) {
      viewer.dataSources.remove(kml_tsusin_Polygon);
    } else if (polygon_change_10.checked == true) {
      viewer.dataSources.add(kml_tsusin_Polygon);
    };
    viewer.camera.moveUp(0.001);
  });
  // 電力工事
  const polygon_change_6 = document.getElementById('facility-check6');
  polygon_change_6.addEventListener('change', () => {
    if (polygon_change_6.checked == false) {
      viewer.dataSources.remove(kml_denryoku_Polygon);
    } else if (polygon_change_6.checked == true) {
      viewer.dataSources.add(kml_denryoku_Polygon);
    };
    viewer.camera.moveUp(0.001);
  });

  // ガス工事
  const polygon_change_7 = document.getElementById('facility-check7');
  polygon_change_7.addEventListener('change', () => {
    if (polygon_change_7.checked == false) {
      viewer.dataSources.remove(kml_gasu_Polygon);
    } else if (polygon_change_7.checked == true) {
      viewer.dataSources.add(kml_gasu_Polygon);
    };
    viewer.camera.moveUp(0.001);
  });
  // 上水道
  const polygon_change_8 = document.getElementById('facility-check8');
  polygon_change_8.addEventListener('change', () => {
    if (polygon_change_8.checked == false) {
      viewer.dataSources.remove(kml_jousui_Polygon);
    } else if (polygon_change_8.checked == true) {
      viewer.dataSources.add(kml_jousui_Polygon);
    };
    viewer.camera.moveUp(0.001);
  });
  // 下水道
  const polygon_change_9 = document.getElementById('facility-check9');
  polygon_change_9.addEventListener('change', () => {
    if (polygon_change_9.checked == false) {
      viewer.dataSources.remove(kml_gesui_Polygon);
    } else if (polygon_change_9.checked == true) {
      viewer.dataSources.add(kml_gesui_Polygon);
    };
    viewer.camera.moveUp(0.001);
  });




  // 住所検索の検索ボタンでみなとみらいに飛ぶ（KMLデータ全表示）
  var jusyo_search = document.getElementById('jusyo-search');
  jusyo_search.addEventListener('click',
    function () {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(139.63151, 35.45896, 2000.0),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
        },
      });
      viewer.dataSources.add(kml_tsusin_Polygon);
      viewer.dataSources.add(kml_tsusin_MH);
      viewer.dataSources.add(kml_tsusin_PL);
      viewer.dataSources.add(kml_denryoku_MH);
      viewer.dataSources.add(kml_denryoku_PL);
      viewer.dataSources.add(kml_denryoku_Polygon);
      viewer.dataSources.add(kml_gasu_MH);
      viewer.dataSources.add(kml_gasu_PL);
      viewer.dataSources.add(kml_gasu_Polygon);
      viewer.dataSources.add(kml_jousui_MH);
      viewer.dataSources.add(kml_jousui_PL);
      viewer.dataSources.add(kml_jousui_Polygon);
      viewer.dataSources.add(kml_gesui_MH);
      viewer.dataSources.add(kml_gesui_PL);
      viewer.dataSources.add(kml_gesui_Polygon);
    },
  );






  //マップ切替
  let layer1 = new Cesium.ArcGisMapServerImageryProvider({
    url:
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  });

  let layer2 = new Cesium.OpenStreetMapImageryProvider({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/',
    credit: new Cesium.Credit('地理院タイル', '', 'https://maps.gsi.go.jp/development/ichiran.html')
  });


  const imitationSelect = document.getElementsByClassName('imitationSelect');
  const imitationPulldown = document.getElementsByClassName('imitationPulldown');
  const imitationPulldown_tr = document.getElementsByClassName('imitationPulldown-tr');

  // クリックでマップ変更
  imitationPulldown_tr[0].trClick = function () {
    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(layer2, 0);
  }
  imitationPulldown_tr[1].trClick = function () {
    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(layer1, 0);
  }

  //縮尺表示
  viewer.camera.moveEnd.addEventListener(function () {
    // the camera stopped moving
    updateDistanceScale();
  });
  window.addEventListener('load', () => {
    viewer.camera.moveUp(0.001);
    updateDistanceScale();
  })

  function updateDistanceScale() {
    var geodesic = new Cesium.EllipsoidGeodesic();
    var distances = [
      1, 2, 3, 5,
      10, 20, 30, 50,
      100, 200, 300, 500,
      1000, 2000, 3000, 5000,
      10000, 20000, 30000, 50000,
      100000, 200000, 300000, 500000,
      1000000, 2000000, 3000000, 5000000,
      10000000, 20000000, 30000000, 50000000];

    // Find the distance between two pixels at the bottom center of the screen.
    var width = viewer.scene.canvas.clientWidth;
    var height = viewer.scene.canvas.clientHeight;

    var left = viewer.scene.camera.getPickRay(new Cesium.Cartesian2((width / 2) | 0, height - 1));
    var right = viewer.scene.camera.getPickRay(new Cesium.Cartesian2(1 + (width / 2) | 0, height - 1));

    var globe = viewer.scene.globe;
    var leftPosition = globe.pick(left, viewer.scene);
    var rightPosition = globe.pick(right, viewer.scene);

    if (typeof leftPosition == "undefined" || typeof rightPosition == "undefined") {
      $("#scalebartag").text("undefined");
      return;
    }

    var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
    var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);

    geodesic.setEndPoints(leftCartographic, rightCartographic);
    //  var pixelDistance = geodesic.surfaceDistance * 3.28084; //meters to feet
    var pixelDistance = geodesic.surfaceDistance;
    //  var pixelDistanceMiles = pixelDistance / 5280;
    var pixelDistanceMiles = pixelDistance / 1000;

    // Find the first distance that makes the scale bar less than 100 pixels.
    var maxBarWidth = 100;
    var distance;
    var label;
    var units;

    for (var i = distances.length - 1; i >= 0; --i) {
      if (distances[i] / pixelDistance < maxBarWidth) {
        if (distances[i] >= 1000) {
          for (var j = distances.length - 1; j >= 0; --j) {
            if (distances[j] / pixelDistanceMiles < maxBarWidth) {
              distance = distances[j];
              units = " km";
              break;
            }
          }
          break;
        }
        else {
          distance = distances[i];
          units = " m";
          break;
        }
      }
    }

    if (typeof distance !== "undefined") {

      label = distance.toString() + units;

      if (units === " km") {
        document.getElementById("scalebar").style.width = ((distance / pixelDistanceMiles) | 0).toString() + "px";
      }
      else {
        document.getElementById("scalebar").style.width = ((distance / pixelDistance) | 0).toString() + "px";
      }

      $("#scalebartag").text(label);
    } else {
      document.getElementById("scalebar").style.width = "100px";
      $("#scalebartag").text("undefined");
    }
  }









}());














