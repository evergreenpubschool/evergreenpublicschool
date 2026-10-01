type GoogleMapProps = {
  location: string;
};

export default function GoogleMap({ location }: GoogleMapProps) {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="w-full overflow-hidden rounded-2xl border">
      <iframe
        src={mapUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="School location on Google Maps"
      />
    </div>
  );
}
