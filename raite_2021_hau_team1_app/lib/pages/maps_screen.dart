import "package:flutter/material.dart";
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapScreen extends StatefulWidget {
  @override
  _MapScreenState createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  static const _initialCameraPosition =
      CameraPosition(target: LatLng(37, -122), zoom: 11.5);

  GoogleMapController _googleMapController;
  Marker _origin;
  Marker _destination;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        title: Text("Google Map"),
        actions: [
          TextButton(
              onPressed: () => _googleMapController.animateCamera(
                  CameraUpdate.newCameraPosition(CameraPosition(
                      target: _origin.position, zoom: 14.5, tilt: 50.0))),
              style: TextButton.styleFrom(primary: Colors.green),
              child: Text("Origin")),
          if (_destination != null)
            TextButton(
                onPressed: () => _googleMapController.animateCamera(
                    CameraUpdate.newCameraPosition(CameraPosition(
                        target: _origin.position, zoom: 14.5, tilt: 50.0))),
                style: TextButton.styleFrom(primary: Colors.green),
                child: Text("Destination")),
        ],
      ),
      body: GoogleMap(
        myLocationButtonEnabled: false,
        zoomControlsEnabled: false,
        initialCameraPosition: _initialCameraPosition,
        onMapCreated: (controller) => _googleMapController = controller,
        markers: {
          if (_origin != null) _origin,
          if (_destination != null) _destination
          // _destination
        },
        onLongPress: _addMarker,
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.grey,
        foregroundColor: Colors.black,
        // onPressed: () => print(_origin),
        onPressed: () => _googleMapController.animateCamera(
            CameraUpdate.newCameraPosition(_initialCameraPosition)),
        child: Icon(Icons.center_focus_strong),
      ),
    );
  }

  void _addMarker(LatLng pos) {
    if (_origin == null || (_origin != null && _destination != null)) {
      setState(() {
        _origin = Marker(
            markerId: MarkerId('origin'),
            infoWindow: InfoWindow(title: 'Origin'),
            icon: BitmapDescriptor.defaultMarkerWithHue(
                BitmapDescriptor.hueGreen),
            position: pos);
      });
      _destination = null;
    } else {
      setState(() {
        _destination = Marker(
            markerId: MarkerId('destination'),
            infoWindow: InfoWindow(title: 'Destination'),
            icon:
                BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
            position: pos);
      });
    }
  }
}
