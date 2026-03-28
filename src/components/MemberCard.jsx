import {
  applyImageFallback,
  createAvatarPlaceholder,
  withFallbackImage,
} from "../utils/placeholders";

function MemberCard({ member, onClick, onKeyDown }) {
  const fallbackImage = createAvatarPlaceholder(member.name);

  return (
    <div
      className="member-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label={`Open ${member.name}'s portfolio`}
    >
      <div className="member-image-wrapper">
        <img
          src={withFallbackImage(member.imageUrl, fallbackImage)}
          alt={`${member.name} portrait`}
          className="member-image"
          loading="lazy"
          decoding="async"
          onError={(event) => applyImageFallback(event, fallbackImage)}
        />
      </div>
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
    </div>
  );
}

export default MemberCard;
