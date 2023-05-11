export function renderTeamMembersCard({
    name = '',
    github = '',
    linkedin = '',
    telegram = '',
    role = '',
    img = '',
  })
{
  return markup =
  `<div class=" swiper-slide">
        <img src="${img}" alt="${name}" class="team-member__img">
            <h3 class="team-member__title">${name}</h3>
                <p lang="en" class="team-member__text">${role}</p>
                    <ul class="team-social list">
                        <li class="team-social__item">
                            <a href="${telegram}" class="team-social__link" target="_blank">
                                <span class="fa-brands fa-telegram team-social__icon"></span>
                            </a>
                        </li>
                        <li class="team-social__item">
                            <a href="${github}" class="team-social__link link" target="_blank">
                                <span class="fab fa-github  team-social__icon"></span>
                            </a>
                        </li>
                        <li class="team-social__item">
                            <a href="${linkedin}" class="team-social__link link" target="_blank">
                                <span class="fa-brands fa-linkedin team-social__icon"></span>
                            </a>
                        </li>
                    </ul>
    </div>`;
}