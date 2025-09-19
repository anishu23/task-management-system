using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TaskManagementSystem.Interfaces;


namespace TaskManagementSystem.Services;

public class JwtTokenService : IJwtTokenService
{
    public JwtTokenService()
    {

    }

    string IJwtTokenService.GenerateJwtToken(string username)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("solar_mango_vector_orchid_quantum_ripple_cobalt_nebula_zenith_ember_willow"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken
        (
            issuer: "amplinsoftech.com", // Only for local implementation, issuer should come from base_url in prod
            audience: "amplinsoftech.com", // Only for local implementation, audience should come from base_url in prod
            claims: claims,
            expires: DateTime.Now.AddMinutes(2),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}