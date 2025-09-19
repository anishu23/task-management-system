using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly TaskManagementSystemContext _context;
        private readonly IJwtTokenService _tokenService;


        public AuthController(TaskManagementSystemContext context, IUserService userService, IJwtTokenService tokenService)
        {
            _context = context;
            _userService = userService;
            _tokenService = tokenService;
        }

        // POST: api/Auth/register
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> PostUser(User user)
        {
            try
            {
                var newUser = await _userService.CreateUser(user);
                return CreatedAtAction(nameof(PostUser), new { id = newUser.id }, newUser);

            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = e.Message });
            }
            
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(UserCredential userCredential)
        {
            if (await _userService.ValidateUserCredentials(userCredential))
            {
                var token = _tokenService.GenerateJwtToken(userCredential.email);
                var user = await _userService.GetUser(userCredential.email);
                return Ok(new { token = token, username = user.username });
            }
            return Unauthorized();
        }
    }
}
